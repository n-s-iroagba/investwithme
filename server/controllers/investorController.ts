import { Request, Response } from 'express';
import { howToInvestMessage, PROMO_PERCENT, REFERRAL_BONUS_PERCENT } from '../config';
import { Investor, DepositWallet, Investment, Referral, Notification, Transaction, Manager } from '../types/investorTypes';
import { AdminWallet } from '../types/adminTypes';
import { customError, findManagerWithHighestMinInvestment, formatEndDate } from '../helpers';
import { sendReferralBonusEmail, sendCompleteInvestmentDepositReceivedEmail, sendIncompleteInvestmentDepositReceivedEmail, sendPromoBonusEmail, sendHowToInvestMail, } from '../mailService';
import { Op } from 'sequelize';



export const index = async (req: Request, res: Response): Promise<Response> => {
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
    return res.status(error.status||500).json(error);
  }
};

export const createInvestment = async (req: Request, res: Response): Promise<Response> => {
  const id = req.params.id;
  const { amount, wallet, managerId } = req.body as {
    amount: number
    wallet: AdminWallet;
    managerId: number
  }
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
      creationDate: new Date(),
      amountDeposited: 0,
      isPaused: false,
      investorId: id as unknown as number,
      managerId: managerId as unknown as number,
    });
    console.log('investment created')
    console.log(newInvestment)

    const depositWallet: DepositWallet = await DepositWallet.create({
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

    return res.status(error.status||500).json(error);
  }
}

export const topUp = async (req: Request, res: Response): Promise<Response> => {
  try {
    let { address, amount } = req.body as {
      address: string
      amount: number,
    };

    if (amount || address) {
      console.log('amount', amount)
      console.log('address', address)
      throw customError('Incomplete payload from client', 400);
    }
    amount = Number(amount);

    const wallet = await DepositWallet.findOne({
      where: { address: address }
    });
    if (!wallet) {
      throw customError(`investor deposit wallet not fount`, 404);
    }

    const investmentId = wallet.investmentId;
    if (!investmentId) {
      throw customError('Investment ID is null', 400);
    }


    const investment = await Investment.findByPk(investmentId);
    if (!investment) {
      throw customError(`Investment with ID ${investmentId} not found`, 404);
    }
    const investor = investment.investor;
    if (!investor) {
      throw customError(`Investor for Investment with ID ${investmentId} not found`, 404)
    }
    const managerId = investment.managerId
    if (!managerId) {
      throw customError('Manager ID is null', 400);
    }
    let manager = await Manager.findByPk(managerId);
    if (!manager) {
      throw customError(`The manager of the investment you are trying to credit not found on the database`, 404);
    }

    let investmentAmount = amount;
    if (investor.hasInvested) {
      if (investment.amount >= (investment.amountDeposited + amount) && investment.isPaused) {
        investment.isPaused = false;
        investment.investmentDate = new Date()
      }

    } else {
      investment.investmentDate = new Date();
      investmentAmount = amount + (amount * PROMO_PERCENT);
      investor.hasInvested = true;
    }

    investment.amountDeposited += investmentAmount;

    if (investment.amountDeposited > investment.amount) {
      const managers = await Manager.findAll();
      if (managers.length === 0) {
        throw customError(`The no managers in database`, 404);
      }
      const newManager: Manager = findManagerWithHighestMinInvestment(managers, investment.amountDeposited);
      investment.managerId = newManager.id;;
    }

    await investment.save();
    await investor.save();

    let referral;
    if (investor.referrerId) {

      const referrer = Investor.findByPk(investor.referrerId);
      if (!referrer) {
        throw customError(`The referrer you are trying to credit not found on the database`, 404);
      }

      let referral = await Referral.findOne({ where: { referredId: investor.id, referrerId: investor.referrerId } });
      if (!referral) {
        throw customError(`The referral you are trying to credit not found on the database`, 404);
      }
      referral.amount = amount * REFERRAL_BONUS_PERCENT;

      const referralInvestment = Investment.findOne({ where: { investorId: investor.referrerId } })
      if (!referralInvestment) {
        throw customError(`The referrer you are trying to credit has not invested yet`, 403);
      }
      referral.hasInvested = true
    }

    const notificationTitle = investment.amountDeposited >= investment.amount ? 'Investment deposit' : 'Incomplete Investment Deposit';
    const notificationMessage =
      investment.amountDeposited >= investment.amount
        ? `Thank you,\nWe have received your deposit of ${amount}, we look forward to growing wealth with you.\nCheers,`
        : `Thank you,\nWe have received your deposit. However, we wish to notify you that the deposited amount (${investment.amountDeposited}) is lower than the actual required amount (${investment.amount}). Kindly ensure you pay the remaining amount as soon as possible.\nCheers,`;

    await Notification.create({
      title: notificationTitle,
      message: notificationMessage,
      investorId: investor.id,
    });

    await Transaction.create({
      type: 'Credit',
      amount: amount,
      date: new Date(),
      narration: 'Investment Deposit',
      participatingAccount: 'Your Crypto Wallet',
    });

    investment.amountDeposited >= investment.amount ? await sendCompleteInvestmentDepositReceivedEmail(investor, investment) : await sendIncompleteInvestmentDepositReceivedEmail(investor, investment);
    return res.status(200).json({ message: 'successfully credited investor' });

  } catch (error: any) {
    console.error('Error in topUp function:', error);
    return res.status(error.status||500).json(error);
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
      participatingAccount: 'Your Crypto Wallet',
      date: new Date(),
      narration: 'Promo bonus imbursement',
    });

    await Notification.create({ title: 'Bonus Payout', message: 'hello this is payment notification' });

    await sendPromoBonusEmail(investor, investment.amount * PROMO_PERCENT);

    return res.status(200).json({ message: 'Payment successful', investment });

  } catch (error: any) {
    console.error('error in PayPromoBonus function', error);
    return res.status(error.status||500).json(error);
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

    await sendReferralBonusEmail(referrerInvestor, referredInvestor);

    return res.status(200).json({ message: 'Referral bonus paid successfully' });

  } catch (error: any) {
    console.error('Error in payReferralBonus function:', error);
    return res.status(error.status||500).json(error);
  }
}

export const getInvestment = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  try {
    const investmentDetails = await Investor.findByPk(id, {
      include: [
        {
          model: Investment,
          include: [
            {
              model: Manager,
            },
            {
              model: DepositWallet,
            }
          ],
        },
        {
          model: Referral,
          as: 'referrals',
        }
      ],
    });
    if (!investmentDetails) {
      throw customError('error pulling out investment Details', 400)
    }
    console.log(investmentDetails)
    if (!investmentDetails.investment) {
      throw customError('no investment yet', 404)
    }
    let totalCount = 0; let totalAmount = 0;

    investmentDetails.referrals && investmentDetails.referrals.forEach((referral) => {
      totalCount++;
      totalAmount += referral.amount;
    });

    const totalReferrals = { count: totalCount, totalAmount };

    return res.status(200).json({
      referrals: totalReferrals,
      investment: investmentDetails
    });

  } catch (error: any) {
    console.error('Error in getInvestment function:', error);
    return res.status(error.status||500).json(error);
  }
}

export const getAllDueReferrals = async (req: Request, res: Response): Promise<Response> => {
  try {
    const referralsWithWallets = await Referral.findAll({
      where: {
        amount: {
          [Op.gt]: 0,
        }
      },
      include: [
        {
          model: Investor,
          include: [
            {
              model: Investment,
              include: [{ model: DepositWallet }],
            }
          ],
        }
      ],
    });
    if (referralsWithWallets.length === 0) {
      throw customError('no due referrals found', 404)
    }
    return res.status(200).json(referralsWithWallets);
  } catch (error: any) {
    console.error('Error in getAllDueRefferal function:', error);
    return res.status(error.status||500).json(error);
  }
}

export const getInvestorReferrals = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  try {
    const referrals = await Referral.findAll({ where: { referrerId: id } });
    return res.status(200).json(referrals);
  } catch (error: any) {
    console.error('Error in getInvestorReferral function:', error);
    return res.status(error.status||500).json(error);
  }
}


export const getNotifications = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;

    const notifications = await Notification.findAll({ where: { investorId: id } });

    return res.status(200).json(notifications);
  } catch (error: any) {
    console.error('Error in getNotifications function:', error);
    return res.status(error.status||500).json(error);
  }
}

export const getTransactions = async (req: Request, res: Response): Promise<Response> => {

  try {
    const { id } = req.params;

    const transactions = await Transaction.findAll({ where: { investorId: id } });

    return res.status(200).json(transactions);
  } catch (error: any) {
    console.error('Error in getTransactions function:', error);
    return res.status(error.status||500).json(error);
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


    investor.investment.manager && endDate.setDate(endDate.getDate() + investor.investment.manager.duration);

    const currentDate = new Date();

    if (currentDate <= endDate) {
      const dueDate = formatEndDate(endDate);
      return res.status(200).json({ status: 'notDue', date: dueDate });
    }

    return res.status(200).json({ status: 'due' });
  } catch (error: any) {
    console.error(error);
    return res.status(error.status||500).json();
  }
}






