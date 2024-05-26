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










