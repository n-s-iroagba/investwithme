import { Request, Response } from 'express';
import { howToInvestMessage, PROMO_PERCENT, REFERRAL_BONUS_PERCENT } from '../config';
import { Investor, DepositWallet, Investment, Referral, Notification, Transaction, PendingPromo } from '../types/investorTypes';
import { AdminWallet, Manager } from '../types/adminTypes';
import { changeManager, createDepositNotificationAndTransaction, customError, formatEndDate, handleFirstDepositReferral, handleIsPaused, handlePromo, sendRecieptEmailDependingOnCompletenessOfDepositedAmount } from '../helpers';
import { sendReferralBonusEmail, sendCompleteInvestmentDepositReceivedEmail, sendIncompleteInvestmentDepositReceivedEmail, sendPromoBonusEmail, sendHowToInvestMail, } from '../mailService';
import { Op, Sequelize } from 'sequelize';
import { InvestmentCreationPayLoad, PayInvestorPayLoad } from '../../../common/types';



export const index = async (req: Request, res: Response): Promise<Response> => {
  const mockInvestorData = {
    firstName: "Alice",
    lastName: "Smith",
    password: "securePassword123",
    email: "alice.smith@example.com",
    dateOfBirth: new Date("1990-05-10"),
    gender: "Female",
    country: "United States",
    bank: "Chase Bank",
    isVerified: true
  };
  await Investor.create(mockInvestorData)

  return res.send('hello from investwithme server, I am connected');
}

export const getInvestmentInitiationData = async (req: Request, res: Response): Promise<Response> => {
  try {
    const managers = await Manager.findAll();

    if (managers.length === 0) {
      throw customError('There are no managers in the database', 404);
    }

    const wallets: AdminWallet[] = await AdminWallet.findAll();

    if (wallets.length === 0) {
      throw customError('There are no admin wallets in the database', 404);
    }

    return res.status(200).json({ wallets, managers });
  } catch (error: any) {
    console.error('error in getInvestmentIntiationData function', error);
    return res.status(error.status).json(error);
  }
};

export const createInvestment = async (req: Request, res: Response): Promise<Response> => {
  const id = req.params.id;
  const { amount, wallet, managerId } = req.body as InvestmentCreationPayLoad
  try {
    if (!amount || !wallet || !managerId) {
      console.log('amount', amount)
      console.log('wallet', wallet)
      console.log('managerId', managerId)
      throw customError('Incomplete payload from client', 400);
    }

    const investor: Investor | null = await Investor.findByPk(id);
    if (!investor) {
      throw customError(`Investor with id ${id} is not in the database`, 404);
    }

    if (investor.investment) {
      await investor.investment.destroy();
    }

    const manager: Manager | null = await Manager.findByPk(managerId)
    if (!manager) {
      throw customError(`Manager with id ${managerId} is not in the database`, 404);
    }

    const newInvestment: Investment = await Investment.create({
      amount: amount as unknown as number,
      amountDeposited: 0,
      isPaused: false,
      investorId: id as unknown as number,
      managerId: managerId as unknown as number,
    });
    console.log('investment created')
    console.log(newInvestment)

    let depositWallet: DepositWallet = await DepositWallet.create({
      ...wallet,
      investmentId: newInvestment.id,
    });
    console.log('deposit wallet created')
    console.log(depositWallet)

    const notification: Notification = await Notification.create({
      title: 'How to invest',
      message: howToInvestMessage,
      investorId: id as unknown as number,
    });
    console.log('how to invest notification  created')
    console.log(notification)

    const responseWallet: AdminWallet | null = await AdminWallet.findOne({
      where: {
        network: wallet.network,
        blockchain: wallet.blockchain,
        currency: wallet.currency,
      }
    });
  
    if (!responseWallet) {
      throw customError(`The wallet the investor was supposed to pay to is not in the database`, 404);
    }
  
  
    return res.status(200).json(responseWallet);

  } catch (error: any) {

    console.error('error in CreateInvestmnent function ', error);

    return res.status(error.status).json(error);
  }
}

export const topUp = async (req: Request, res: Response): Promise<Response> => {
  try {
    let { address, amount } = req.body as PayInvestorPayLoad
    if (!amount || !address) {
      console.log('amount', amount)
      console.log('address', address)
      throw customError('Incomplete payload from client', 400);
    }

    const wallet = await DepositWallet.findOne({
      where: {
        [Op.and]: [
          Sequelize.where(Sequelize.fn('LEFT', Sequelize.col('address'), 7), Sequelize.fn('LEFT', address, 7)),
          Sequelize.where(Sequelize.fn('RIGHT', Sequelize.col('address'), 7), Sequelize.fn('RIGHT', address, 7)),
        ],
      },
    });

    if (!wallet) {
      throw customError(`investor deposit wallet not found`, 404);
    }

    const investment = await Investment.findByPk(wallet.investmentId);
    if (!investment) {
      throw customError(`The investment you are trying to credit not found on the database`, 404);
    }

    const investor = await Investor.findByPk(investment.investorId);
    if (!investor) {
      throw customError(`The investor you are trying to credit not found on the database`, 404);
    }


    let manager = await Manager.findByPk(investment.managerId);
    if (!manager) {
      throw customError(`The manager of the investment you are trying to credit not found on the database`, 404);
    }

    const isFirstDeposit = investment.amountDeposited === 0 ? true : false;
    investment.amountDeposited += amount

    createDepositNotificationAndTransaction(investment, amount, investor.id)

    if (investment.amount < investment.amountDeposited) {
      changeManager(investment)
    }
    if (isFirstDeposit) investment.investmentDate = new Date()

    await investment.save()

    sendRecieptEmailDependingOnCompletenessOfDepositedAmount(investor, investment)

    if (isFirstDeposit) {
      handlePromo(investor, amount);
      if (investor.referrerId !== null) {
        handleFirstDepositReferral(investor, amount);
      }
    }
    console.log('investment', investment)
    if (investment.isPaused) handleIsPaused(investment)

    return res.status(200).json({ message: 'successfully credited investor' });

  } catch (error: any) {
    console.error('Error in topUp function:', error);
    return res.status(error.status).json(error);
  }
}

export const payPromoBonus = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { walletAddress } = req.body;

    const wallet = await DepositWallet.findOne({ where: { address: walletAddress } });

    if (!wallet) {
      throw customError(`The investor wallet you are trying to pay bonus to not found `, 404);
    }

    const investor = await Investor.findOne({
      include: [
        {
          model: Investment,
          include: [
            {
              model: DepositWallet,
              where: { id: wallet.id }
            }
          ],
        }
      ],
    });

    if (!investor) {
      throw customError(`The investor you are trying to pay bonus to not found `, 404);
    }

    const investment = investor.investment;
    if (!investment) {
      throw customError(`The investor  you are trying to pay bonus has no investment in the database `, 404);
    }

    investment.amount -= investment.amount * PROMO_PERCENT;
    await investment.save();

    await Transaction.create({
      investorId: investor.id,
      amount: investment.amount * PROMO_PERCENT,
      type: 'Debit',
      participatingAccount: 'Your Wallet',
      date: new Date(),
      narration: 'Promo bonus imbursement',
    });

    await Notification.create({ title: 'Bonus Payout', message: 'hello this is payment notification' });

    await sendPromoBonusEmail(investor, investment.amount * PROMO_PERCENT);

    return res.status(200).json({ message: 'Payment successful', investment });

  } catch (error: any) {
    console.error('error in PayPromoBonus function', error);
    return res.status(error.status).json(error);
  }
}

export const payReferralBonus = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  try {
    const referral = await Referral.findByPk(id);
    if (!referral) {
      throw customError(`The referral  you are trying to pay bonus has no investment in the database `, 404);;
    }

    const referredInvestor = await Investor.findByPk(referral.referredId);
    if (!referredInvestor) {
      throw customError(`The referredInvestor  you are trying to pay bonus has no investment in the database `, 404);;
    }

    let referrerInvestor;

    if (referredInvestor.referrerId) {
      referrerInvestor = await Investor.findByPk(referredInvestor.referrerId);
      if (!referrerInvestor) {
        throw customError(`The referrerInvestor  you are trying to pay bonus has no investment in the database `, 404);;
      }
    } else {
      throw customError(`The referredInvestor has no referrer`, 404);;
    }

    await Transaction.create({
      type: 'Credit',
      amount: referral.amount,
      date: new Date(),
      narration: 'Referral bonus reimbursement',
      participatingAccount: 'Cassock', // Replace COMPANY_NAME with the actual company name
      investorId: referrerInvestor.id,
    });

    await Notification.create({
      title: 'Referral bonus imbursement',
      message: `Congratulations! You have earned ${referral.amount} for referring ${referredInvestor.firstName} ${referredInvestor.lastName}. This earned bonus will be added to your investment and will be paid out on the due date of your investment payout.`,
      investorId: referrerInvestor.id,
    });
    referral.settled = true
    referral.save()
    await sendReferralBonusEmail(referrerInvestor, referredInvestor);

    return res.status(200).json({ message: 'Referral bonus paid successfully' });

  } catch (error: any) {
    console.error('Error in payReferralBonus function:', error);
    return res.status(error.status).json(error);
  }
}

export const getInvestment = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  console.log('id is ' + id)

  try {
    const investment = await Investment.findOne({ where: { investorId: id } });
    console.log(investment)
    if (!investment) {
      throw customError('no investment yet', 404)
    }

    const referrals = await Referral.findAll({ where: { referrerId: id } })
    let totalCount = 0; let totalAmount = 0;
    console.log(referrals)
    referrals.forEach((referral) => {
      totalCount++;
      totalAmount += referral.amount;
    });
    const manager = await Manager.findByPk(investment.managerId)
    const totalReferrals = { count: totalCount, totalAmount: totalAmount };
    const responseData = {
      referrals: totalReferrals,
      investment: investment,
      manager:manager
    }
    return res.status(200).json(responseData);

  } catch (error: any) {
    console.error('Error in getInvestment function:', error);
    return res.status(error.status || 500).json(error);
  }
}

export const getAllDueReferrals = async (req: Request, res: Response): Promise<Response> => {
  try {
    const referrals = await Referral.findAll({
      where: {
        amount: {
          [Op.gt]: 0,
        },
        settled: false
      },
    });
    let responseData = []
    for (const referral of referrals) {
      const investment = await Investment.findOne({ where: { investorId: referral.referrerId } })

      if (investment === null) {
        throw customError('The referrer has no investment', 404)
      }
      const wallet = DepositWallet.findOne({ where: { investmentId: investment.id } })

      responseData.push({id:referral.id,amount:referral.amount,wallet: wallet })

    }
    return res.status(200).json(responseData);
  } catch (error: any) {
    console.error('Error in getAllDueRefferal function:', error);
    return res.status(error.status).json(error);
  }
}

export const getNewbies = async (req: Request, res: Response): Promise<Response> => {
  let responseData = []
  const referrals = await Referral.findAll({
    where: {
      amount: {
        [Op.gt]: 0,
      },
      settled: false
    },
  });
  const pendingPromos = await PendingPromo.findAll({
    where: {
      amount: {
        [Op.gt]: 0,
      },
      settled: false
    },
  });
  if (referrals.length) {
    responseData.push('referrals')
  }
  if (pendingPromos.length) {
    responseData.push('promos')
  }
  return res.status(200).json(responseData)
}
export const getPendingPromo = async (req: Request, res: Response): Promise<Response> => {
  try {
    const pendingPromos:PendingPromo[] = await PendingPromo.findAll(
      {
      where: {
        amount: {
          [Op.gt]: 0,
        },
        settled: null
      },
    }
  );
  let responseBody = []
  for (const promo of pendingPromos){
    const investorId = promo.investorId
    const investor = await Investor.findByPk(promo.investorId)
    if (!investor){
      throw customError('investor for promo not found',404)
    }
    const investment = await Investment.findOne({where:{
      investorId:investor.id
    }})

    if (!investment){
      throw customError('investor for the promo payment has not invested',404)
    }
  
   const wallet = DepositWallet.findOne({where:{
    investmentId:investment.id
   }})
  if (!wallet) {
    throw customError('wallet for promo not found',404)
  }   

  responseBody.push({id:promo.id,amount:promo.amount,wallet:wallet})
    
  }
    return res.status(200).json(pendingPromos)

  } catch (error: any) {
    console.error('Error in getPendingPromo function:', error);
    return res.status(error.status || 500).json(error);
  }

}
export const getInvestorPaidReferrals = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  try {
    const referrals = await Referral.findAll({
      where: {
        referrerId: id, settled: true
      }
    });
    return res.status(200).json(referrals);
  } catch (error: any) {
    console.error('Error in getInvestorReferral function:', error);
    return res.status(error.status).json(error);
  }
}

export const getInvestorAllReferrals = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  try {
    const referrals = await Referral.findAll({ where: { referrerId: id } });
    return res.status(200).json(referrals);
  } catch (error: any) {
    console.error('Error in getInvestorReferral function:', error);
    return res.status(error.status).json(error);
  }
}


export const getNotifications = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;

    const notifications = await Notification.findAll({ where: { investorId: id } });

    return res.status(200).json(notifications);
  } catch (error: any) {
    console.error('Error in getNotifications function:', error);
    return res.status(error.status).json(error);
  }
}

export const getTransactions = async (req: Request, res: Response): Promise<Response> => {

  try {
    const { id } = req.params;

    const transactions = await Transaction.findAll();

    return res.status(200).json(transactions);
  } catch (error: any) {
    console.error('Error in getTransactions function:', error);
    return res.status(error.status).json(error);
  }
}

export const getInvestmentStatus = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  try {
    const investor = await Investor.findByPk(id);
    if (!investor) {
      throw customError('Investor not found', 404);
    }

    if (!investor.investment || !investor.investment.investmentDate || investor.investment.amountDeposited === 0) {
      return res.status(200).json({ status: 'notInvested', date: '' });
    }

    const endDate = new Date(investor.investment.investmentDate);


    endDate.setDate(endDate.getDate() + investor.investment.manager.duration);

    const currentDate = new Date();

    if (currentDate <= endDate) {
      const dueDate = formatEndDate(endDate);
      return res.status(200).json({ status: 'notDue', date: dueDate });
    }

    return res.status(200).json({ status: 'due' });
  } catch (error: any) {
    console.error(error);
    return res.status(error.status).json(error);
  }
}
export const getReferralDetails = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  try {
    const investor = await Investor.findByPk(id);
    if (!investor) {
      throw customError('Investor not found', 404);
    }
    const referrals = await Referral.findAll({ where: { referrerId: id } });
    let referrer
    if (!investor.referrerId) {
      referrer = { firstName: '', lastName: '' } as unknown as Investor
    } else {
      referrer = await Investor.findByPk(investor.referrerId);
      if (!referrer) {
        referrer = { firstName: '', lastName: '' } as unknown as Investor
      }
    }
    return res.status(200).json({ referralCode:investor.referralCode,referrer: referrer, referred: referrals });
  }
  catch (error: any) {
    console.error(error);
    return res.status(error.status || 500).json(error);
  }
}





