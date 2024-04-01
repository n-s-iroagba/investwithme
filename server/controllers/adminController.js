const {RETURN_PERCENT,INVESTMENT_TENURE,REFERRAL_BONUS_PERCENT} = require('../config')
const {Investor,Manager,DepositWallet,Referral,Investment,Transaction,Notification} = require('../model');

module.exports = {
    topUp: async (req, res) => {
        try {
          const { walletAddress, amount } = req.body;
          const investmentAmount = amount * RETURN_PERCENT;
      
          // Fetch wallet, investment, and investor
          const wallet = await DepositWallet.findOne({
            where: { address: walletAddress },
            include: [{ model: Investment, include: [{ model: Investor }] }],
          });
      
          if (!wallet) {
            return res.status(404).json({ message: 'Wallet not found' });
          }
      
          const investment = wallet.Investment;
          if (!investment) {
            return res.status(404).json({ message: 'Investment not found' });
          }
      
          const investor = investment.Investor;
          if (!investor) {
            return res.status(404).json({ message: 'Investor not found' });
          }
      
          // Fetch manager
          const manager = await Manager.findByPk(investment.managerId);
          if (!manager) {
            return res.status(404).json({ message: 'Manager not found' });
          }
      
          // Update investment and investor
          investment.incrementPercent = manager.returnPercentage / INVESTMENT_TENURE;
          investor.hasInvested = true;
          investment.amountDeposited = investmentAmount;
      
          // Credit referral and create transactions
          if (investment.referrerId !== null) {
            const refereeInvestor = await Investor.findOne({
              where: { id: investor.refereeId },
              include: [{ model: Referral, as: 'Referrals' }],
            });
      
            const referral = refereeInvestor.Referrals.find(referral => referral.InvestmentId === investment.id);
            if (referral) {
              referral.amountReceived = investmentAmount * REFERRAL_BONUS_PERCENT;
              await referral.save();
              await sendReferralBonusMail()//IMPLEMENT
              createTransaction(refereeInvestor.id, investmentAmount * REFERRAL_BONUS_PERCENT, 'Credit');//IMPLEMENT
              Notification.create({ time: new Date(), message: 'hello this is top up notification' });//IMPLEMENT
            }
          }
      
          createTransaction(investor.id, investmentAmount, 'Credit');//IMPLEMENT
          await Notification.create({ time: new Date(), message: 'hello this is top up notification' });//IMPLEMENT
          if (investmentAmount >= investment.amount) {
            await sendNewInvestmentMail(manager, investmentAmount, 0, investor, false);//IMPLEMENT
          } else {
            await sendLowerInvestmentMail(manager, investmentAmount, 0, investor, true);//IMPLEMENT
          }
      
          return res.status(200).json({ investment, investor });
        } catch (error) {
          console.error('Error in topUp function:', error);
          return res.status(500).json({ error: 'Internal server error' });
        }
      },
      
  payInvestors: async (req, res) => {
    try {
      const { walletAddress, amount } = req.body;

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

      await createTransaction(investor.id, amount, 'withdrawal');//IMPLEMENT

      await sendPaymentMail(investor, amount);//IMPLEMENT

      await Notification.create({ time: new Date(), message: 'hello this is payment notification' });//IMPLEMENT

    } catch (error) {

      console.error('Error occurred:', error.message);
      res.status(500).json({ error: 'Internal server error' });

    }
  },


  getAllInvestors: async (_, res) => {
    try {
      const investors = await Investor.findAll();

      return res.status(200).json({ investors: investors });

    } catch (error) {

      console.error('Error fetching investors:', error);
      return res.status(500).json({ error: 'Error fetching investors' });
    }
  },

  deleteInvestor: async (req, res) => {
    try {
      const investorId = req.params.id;
      const investor = await Investor.findByPk(investorId);

      if (!investor) {
        return res.status(404).json({ error: 'Investor not found' });
      }

      await investor.destroy();

      res.status(200).json({ message: 'Investor deleted successfully' });

    } catch (error) {
      console.error('Error deleting investor:', error);
      res.status(500).json({ error: 'An error occurred while deleting the investor' });
    }
  },

  //Wallet
  createAdminWallet: async (req, res) => {
    try {
      const { address, blockchain, network } = req.body;


      if (!type || !address) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
      AdminWallet.create({
        address,
        blockchain,
        network,
      })
    } catch (error) {
      console.error('Error creating wallet address:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  getAllWallets: async (req, res) => {
    try {
      const wallets = await AdminWallet.findAll();
      return res.status(200).json({ wallets: wallets });
    } catch (error) {
      console.error('Error fetching wallets:', error);
      return res.status(500).json({ error: 'Error fetching wallets' });
    }
  },

  updateWalletAddressById: async (req, res) => {
    const { id } = req.params;
    const { address,blockchain,network } = req.body;
    try {
      const wallet = await AdminWallet.findByPk(id);
      if (!wallet) {
        return res.status(404).json({ error: 'Wallet not found' });
      }
      wallet.address = address;
      wallet.blockchain = blockchain;
      wallet.network = network;
      await wallet.save();
      return res.status(200).json({ message: 'Wallet address updated successfully', wallet });
    } catch (error) {
      console.error('Error updating wallet address:', error);
      return res.status(500).json({ error: 'Failed to update wallet address' });
    }
  },

  deleteWalletAddress: async (req, res) => {
    const { id } = req.params;
    try {
      const wallet = await Wallet.findByPk(id);
      if (!wallet) {
        return res.status(404).json({ error: 'Wallet not found' });
      }
      await wallet.destroy();
      return res.status(200).json({ message: 'Wallet address deleted successfully' });
    } catch (error) {
      console.error('Error deleting wallet address:', error);
      return res.status(500).json({ error: 'Failed to delete wallet address' });
    }
  },



  //Manager
  createManager: async (req, res) => {
  const {
    lastName,
    firstName,
    image,
    minimumDeposit,
    returnPercentage,
    country,
  } = req.body;

  try {
    const manager = await Manager.create({
      lastName,
      firstName,
      image,
      minimumDeposit,
      returnPercentage,
      country,
     
    });

    return res.status(201).json({ message: 'Manager created successfully', manager });
  } catch (error) {
    console.error('Error creating manager:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
},

  getAllManagers: async (req, res) => {
    try {
      const managers = await Manager.findAll();
      return res.status(200).json({ managers: managers });
    } catch (error) {
      console.error('Error fetching managers:', error);
      return res.status(500).json({ error: 'Error getting  managers from database' });
    }
  },

  updateManager: async (req, res) => {
    const {
      lastName,
      firstName,
      image,
      minimumDeposit,
      returnPercentage,
      country,
    } = req.body;
    const { id } = req.params;
    try {
      
      const manager = await Manager.findByPk(id);
      if (!manager) {
        return res.status(404).json({ error: 'Manager not found' });
      } 
      manager.firstName = firstName;
      manager.lastName = lastName;
      manager.image= image;
      manager.minimumDeposit = minimumDeposit;
      manager.returnPercentage = returnPercentage;
      manager.country = country;
      await manager.save();

      return res.status(200).json({ message: 'Manager updated successfully' });
    } catch (error) {
      console.error('Error updating manager:', error);
      return res.status(500).json({ error: 'Error updating manager' });
    }
  },


  deleteManager: async (req, res) => {
    try {
      const { id } = req.params;
      const manager = await Manager.findByPk(id);

      if (!manager) {
        return res.status(404).json({ error: 'Manager does not exist in database' });
      }

      await manager.destroy(); r

      return res.status(200).json({ message: 'Manager deleted successfully' });
    } catch (error) {
      console.error('Error deleting manager:', error);
      return res.status(500).json({ error: 'Error deleting manager' });
    }
  },
//IMPLEMENT ALL BELOW
  createPromo: async (req, res) => {
    try {
      const promo = await Promo.create(req.body);
      return res.status(201).json(promo);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  getPromo: async (req, res) => {
    try {
      const promos = await Promo.findAll();
      return res.status(200).json(promos);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  },

}

const createTransaction = async (id, transactionAmount, type) => {
  if (type === 'withdrawal') {
    transactionAmount = -amount;
  } else if (type !== 'deposit') {
    return res.status(400).json({ error: 'Invalid transaction type' });
  }
  try {
    const transaction = await Transaction.create({
      InvestorId: id,
      amount: transactionAmount,
      type,
    });
  } catch (error) {
    throw new Error(error)
  }
};
const findManagerForInvestment = async (investmentAmount) => {
  const manager = await Manager.findOne({
    where: {
      minimumInvestmentAmount: { [Op.lte]: investmentAmount },
      maximumInvestmentAmount: { [Op.gte]: investmentAmount },
    },
    order: [['id', 'ASC']],
  });
  return manager;
};