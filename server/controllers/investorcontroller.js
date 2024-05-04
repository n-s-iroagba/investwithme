const { howToInvestMessage,PROMO_PERCENT } = require('../config');
const { Investor, Manager, DepositWallet, Investment, Referral, AdminWallet, Notification, PromoNotification, Transaction } = require('../model');
const {findManagerWithHighestMinInvestment,formatEndDate} = require('../helpers')

const { sendReferralBonusEmail, sendCompleteInvestmentDepositReceivedEmail, sendIncompleteInvestmentDepositReceivedEmail,sendPromoBonusPaymentMail} = require('../service');
const { sendHowToInvestMail } = require('../service');

module.exports = {

  index: async (req, res) => {
    // await Investment.sync();

    // // Drop the Investment model
    // await Investment.drop();
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
    const { amount, wallet, managerId } = req.body;
  console.log(req.body)
    try {
    
      if (!amount || !wallet || !managerId) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
      console.log('2')
   
      const investor = await Investor.findByPk(id);
      if (!investor) {
        return res.status(404).json({ message: 'Investor not found' });
      }
      console.log('3')
 
      // if (investor.hasInvested) {
      //   return res.status(400).json({ message: 'You have already invested previously. Proceed to make a top-up payment.' });
      // }
      console.log('5')
      if (investor.Investment) {
        await investor.Investment.destroy();
      }
      console.log('6')
      const investment = await Investment.create({
        amount,
        creationDate: new Date(),
        isPaused: false,
        investorId: id,
        managerId: managerId,
      });

      const createwallet = await DepositWallet.create({
        ...wallet,
        investorId: investor.id,
      });

      console.log(createwallet)
  
      await Notification.create({
        title: 'How To Invest',
        message:howToInvestMessage,
        investorId: id,
      });
      const responseWallet =await  AdminWallet.findOne({where: {
        network: wallet.network,
        blockchain: wallet.blockchain,
        currency: wallet.currency,
      }})
      console.log(responseWallet)
      //await sendHowToInvestMail(investor);
  
      return res.status(200).json(responseWallet);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },
  

  topUp: async (req, res) => {
    //incrementPercent
    //DurationInDays
    // durationInDays: 15,
    // incrementPercent:196
    try {
      let { address, amount } = req.body;
      amount = Number(amount)
      console.log(req.body)
      
      const wallet = await DepositWallet.findOne({
        where: { address: address },
      });
  
      if (!wallet) {
        return res.status(404).json({ message: 'Wallet not found' });
      }
  
      const investor = await Investor.findByPk(wallet.investorId);
      console.log(wallet)
    const investment =await Investment.findOne({where: {investorId:investor.id}})
    let manager = await Manager.findByPk(investment.managerId)
    
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
          manager = findManagerWithHighestMinInvestment(managers, investment.amountDeposited);
        investment.manager = manager
      
      }
      console.log(manager)
      investment.durationInDays = manager.duration*7;
      investment.incrementPercent = manager.percentageYield;
      
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
  
      // if (investment.amountDeposited >= investment.amount) {
      //   sendCompleteInvestmentDepositReceivedEmail(investor, investment);
      // } else {
      //   sendIncompleteInvestmentDepositReceivedEmail(investor, investment);
      // }
  
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

  payPromoBonus: async (req, res) => {
    try {
      const { walletAddress } = req.body;
  
      const wallet = await DepositWallet.findOne({ where: { address: walletAddress } });
  
      if (!wallet) {
        return res.status(404).json({ message: 'Deposit wallet not found' });
      }
  
      const investor = await Investor.findOne({
        include: [
          {
            model: Investment,
            include: [
              {
                model: DepositWallet,
                where: { id: wallet.id },
              },
            ],
          },
        ],
      });
  
      if (!investor) {
        return res.status(404).json({ message: 'Investor not found' });
      }P
  
      const investment = investor.Investment;
      if (!investment) {
        return res.status(404).json({ message: 'Investment not found' });
      }
 
      investment.amount -= investment.amount * PROMO_PERCENT;
      await investment.save();
  
     await Transaction.create({investorId:investor.id,amount:investment.amount * PROMO_PERCENT, type:'Debit',participatingAccount:'Your Wallet',date:new Date(),narration:'Promo bonus imbursement'});

  
    await Notification.create({ title:'Bonus Payout', message: 'hello this is payment notification' });
  
    
    // await sendPromoBonusPaymentMail(investor, investment.amount * PROMO_PERCENT);
  
      return res.status(200).json({ message: 'Payment successful', investment });
    } catch (error) {
      console.error('Error occurred:', error.message);
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
//update investment.amount if amountdeposited > investment.amount
//add investment earnings default to 0
//add investmentduration in days from managerduration
    try {
        const investment = await Investment.findOne({ where: { investorId: id } });
        const referrals = await Referral.findAll({ where: { refereeId: id } });
        const wallet = await DepositWallet.findOne({ where: { investorId: id } });

        console.log(investment);

        if (!investment) {
            return res.status(404).json({ message: 'Investment not found' });
        }

        let totalCount = 0;
        let totalAmount = 0;

        referrals.forEach((referral) => {
            totalCount++;
            totalAmount += referral.amount;
        });

        const totalReferrals = { count: totalCount, totalAmount };

        const manager = await Manager.findOne({ where: { id: investment.managerId } });
        console.log(manager);
        console.log(investment);
        console.log(totalReferrals);
        return res.status(200).json({ investment, referrals: totalReferrals, manager, wallet });
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
// add newNotification
  
      return res.status(200).json(allNotifications);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

 getTransactions: async (req, res) => {
    try {
      const { id } = req.params;
  
      const transactions = await Transaction.findAll({ where: { investorId: id } });
      console.log(transactions)
   
  
      return res.status(200).json(transactions);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  getInvestmentStatus : async (req, res) => {
    const { id } = req.params;
  
    try {
      const investment = await Investment.findByPk(id);
      if (!investment) {
        return res.status(404).json({ error: 'Investment not found' });
      }
  
      if (investment.investmentDate === null) {
        return res.status(200).json({ status: 'notInvested' });
      }
  
      const endDate = new Date(investment.investmentDate);
      console.log(endDate);
      console.log('0')
     
      endDate.setDate(endDate.getDate() + 14);
     console.log(endDate);
      console.log('1')
      const currentDate = new Date();
      console.log(currentDate)
      console.log('2')
      if (currentDate <= endDate) {
        const dueDate = formatEndDate(endDate);
        return res.status(200).json({ status: 'notDue', date: dueDate });
      }
  
      return res.status(200).json({ status: 'due' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  
}
  
  
  

