const { howToInvestMessage } = require('../config');
const { Investor, Manager, DepositWallet, Investment, Referral, AdminWallet, Notification, PromoNotification, Transaction } = require('../model');
const { sendHowToInvestMail } = require('../service');

module.exports = {

  index: async (req, res) => {
    return res.send("hello");
  },

  getInvestmentData: async (req, res) => {
    try {
      const managers = await Manager.findAll();

      if (!managers) {
        return res.status(404).json({ message: "Sorry no managers at this time" });
      }
      const wallets = await AdminWallet.findAll();

      if (!wallets) {
        return res.status(404).json({ message: "Sorry no wallets at this time" });
      }
      return res.status(201).json({ wallets:wallets, managers: managers, });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  createInvestment: async (req, res) => {
    const id = req.params.id;
    const { amount, wallet, manager } = req.body;
  
    try {
    
      if (!amount || !wallet || !manager) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
  
   
      const investor = await Investor.findByPk(id);
      if (!investor) {
        return res.status(404).json({ message: 'Investor not found' });
      }
  
 
      if (investor.hasInvested) {
        return res.status(400).json({ message: 'You have already invested previously. Proceed to make a top-up payment.' });
      }

      if (investor.Investment) {
        await investor.Investment.destroy();
      }
  
       await Investment.create({
        amount,
        creationDate: new Date(),
        isPaused: false,
        investorId: id,
        managerId: manager.id,
      });
  
      await DepositWallet.create({
        ...wallet,
        InvestorId: investor.id,
      });
  
      await Notification.create({
        title: 'How To Invest',
        message:howToInvestMessage,
        investorId: id,
      });
      await sendHowToInvestMail(investor);
  
      return res.status(200).json({ wallet });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },
  

  topUp: async (req, res) => {
    try {
      const { walletAddress, amount } = req.body;
      
      const wallet = await DepositWallet.findOne({
        where: { address: walletAddress },
        include: [{ model: Investment, include: [{ model: Investor }] }],
      });
  
      if (!wallet) {
        return res.status(404).json({ message: 'Wallet not found' });
      }
  
      const investment = wallet.Investment;
      const investor = investment.Investor;
      if (!investment || !investor) {
        return res.status(404).json({ message: 'Investment or Investor not found' });
      }
  
      let investmentAmount = amount;
      if (investor.hasInvested) {
        if ((investment.amount >= investment.amountDeposited + amount) && investment.isPaused) {
          investment.isPaused = false;
        }
      } else {
        investment.investmentDate = new Date();
        const dueDate = new Date();
        investment.dueDate = dueDate.setDate(dueDate.getDate() + 14);
        investmentAmount = amount + (amount * PROMO_PERCENT);
        investor.hasInvested = true;
      }
  
      investment.amountDeposited += investmentAmount;
  
      if (investment.amountDeposited > investment.amount) {
        const managers = await Manager.findAll();
        const manager = findManagerWithHighestMinInvestment(managers, investment.amountDeposited);
        investment.manager = manager;
      }
      
      await investment.save();
      await investor.save();

      let referralWallet, referral;
      if (investor.refereeId) {
        referral = await Referral.findOne({ where: { referredId: investor.id, refereeId: investor.refereeId } });
        referralWallet = await DepositWallet.findOne({ where: { investorId: investor.refereeId } });
        
        if (referral && referralWallet) {
          referral.amount = amount * REFERRAL_BONUS_PERCENT;
          referral.duePayment = true;
          referral.walletId = referralWallet.id;
          await referral.save();
        }
      }

      const notificationTitle = investment.amountDeposited >= investment.amount ?
        'Investment Deposit' : 'Incomplete Deposit';
      const notificationMessage = investment.amountDeposited >= investment.amount ?
        `Thank you,\nWe have received your deposit of ${amount}, we look forward to growing wealth with you.\nCheers,` :
        `Thank you,\nWe have received your deposit. However, we wish to notify you that the deposited amount (${investment.amountDeposited}) is lower than the actual required amount (${investment.amount}). Kindly ensure you pay the remaining amount as soon as possible.\nCheers,`;
  
      if (investment.amountDeposited >= investment.amount) {
        sendCompleteInvestmentDepositReceivedEmail(investor, investment);
      } else {
        sendIncompleteInvestmentDepositReceivedEmail(investor, investment);
      }
  
      await Notification.create({
        title: notificationTitle,
        message: notificationMessage,
        investorId: investor.id,
      });
  
      await Transaction.create({
        type: 'Credit',
        amount: amount,
        data: new Date(),
        narration: 'Investment Deposit',
        participatingAccount: 'Your Wallet',
      });
  
      if (referral) {
        return res.status(201).json({ message: 'Paid, referral present' });
      } else {
        return res.status(200).json({ message: 'Paid' });
      }
    } catch (error) {
      console.error('Error in topUp function:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },
  
  payReferralBonus: async (req, res) => {
    const { id } = req.params;
    try {
      const referral = await Referral.findByPk(id);
  
      if (!referral) {
        return res.status(404).json({ message: 'Referral not found' });
      }
  
      const investor = await Investor.findByPk(referral.referredId);
      const refereeInvestor = await Investor.findByPk(referral.refereeId);
  
      await Transaction.create({
        type: 'Credit',
        amount: referral.amount,
        data: new Date(),
        narration: 'Referral bonus reimbursement',
        participatingAccount: COMPANY_NAME,
        investorId: refereeInvestor.id,
      });
  
      await Notification.create({
        title: 'Referral bonus reimbursement',
        message: `Congratulations! You have earned ${referral.amount} for referring ${investor.firstName} ${investor.lastName}. This earned bonus will be added to your investment and will be paid out on the due date of your investment payout.`,
        investorId: refereeInvestor.id,
      });
  
      await sendReferralBonusEmail(refereeInvestor, investor);
      return res.status(200).json({ message: 'Referral bonus paid successfully' });
    } catch (error) {
      console.error('Error in payReferralBonus function:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },
  
  getInvestment: async (req, res) => {
    const { id } = req.params;

    try {
      const [investment, referrals, manager, wallet] = await Promise.all([
        Investment.findOne({ where: { investorId: id } }),
        Referral.findAll({ where: { refereeId: id } }),
        Manager.findOne({ where: { id: investment.managerId } }),
        DepositWallet.findOne({ where: { investmentId: investment.id } }),
      ]);

      if (!investment) {
        return res.status(404).json({ message: 'Investment not found' });
      }

      return res.status(200).json({ investment, referrals, manager, wallet });
    } catch (error) {
      console.error('Error in getInvestments:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  getAllDueReferrals:async (req, res)=>{
    try {
      const referralsWithWallets = await Referral.findAll({ where:{paymentDue:true},
        include: [{ model: DepositWallet }],
      });
      return res.status(200).json(referralsWithWallets);
    } catch (error) {
      console.error('Error fetching referrals with wallets:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
    
  },

  getInvestorReferrals:async (req, res)=>{
    const {id} = req.params
    try {
    const referrals = Referral.findAll({refereeId: id})
    return res.status(200).json(referrals);
  } catch (error) {
    console.error('Error fetching referrals with wallets:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
},

   getNotifications:async (req, res) => {
    try {
      const { id } = req.params;

      const investor = await Investor.findByPk(id);
      if (!investor) {
        return res.status(404).json({ error: 'Investor not found' });
      }
  
      let notifications = [];
      let promoNotifications = [];

      if (!investor.hasInvested) {
        promoNotifications = await PromoNotification.findAll();
      }
  
     
      notifications = await Notification.findAll({ where: { investorId: id } });
  
      const allNotifications = [...promoNotifications, ...notifications];
  
      return res.status(200).json({ notifications: allNotifications });
    } catch (error) {
      console.error('Error fetching notifications:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

 getTransactions: async (req, res) => {
    try {
      const { id } = req.params;
  
      const transactions = await Transaction.findAll({ where: { investorId: id } });
      if (!transactions || transactions.length === 0) {
        return res.status(200).json({ transactions: [] });
      }
  
      return res.status(200).json({ transactions });
    } catch (error) {
      console.error('Error fetching transactions:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}
  
  
  

