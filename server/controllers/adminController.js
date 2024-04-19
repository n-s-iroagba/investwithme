
const {PROMO_PERCENT,INVESTMENT_TENURE,REFERRAL_BONUS_PERCENT, COMPANY_NAME} = require('../config')
const {Investor,Manager,DepositWallet,Referral,Investment,Transaction,Notification} = require('../model');
const {findManagerWithHighestMinInvestment} =require('../helpers')
module.exports = {

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
  
      if (!blockchain || !address) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
  
      const wallet = await AdminWallet.create({
        address,
        blockchain,
        network,
      });
  
      return res.status(201).json({ message: 'Wallet created successfully', wallet });
    } catch (error) {
      console.error('Error creating wallet address:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },
  
  getAllWallets: async (req, res) => {
    try {
      const wallets = await AdminWallet.findAll();
      return res.status(200).json({ wallets });
    } catch (error) {
      console.error('Error fetching wallets:', error);
      return res.status(500).json({ error: 'Error fetching wallets' });
    }
  },
  
  updateWalletAddressById: async (req, res) => {
    const { id } = req.params;
    const { address, blockchain, network } = req.body;
    try {
      const wallet = await AdminWallet.findByPk(id);
      if (!wallet) {
        return res.status(404).json({ error: 'Wallet not found' });
      }
  
      wallet.address = address || wallet.address;
      wallet.blockchain = blockchain || wallet.blockchain;
      wallet.network = network || wallet.network;
      
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
      const wallet = await AdminWallet.findByPk(id);
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
      return res.status(200).json({ managers });
    } catch (error) {
      console.error('Error fetching managers:', error);
      return res.status(500).json({ error: 'Error getting managers from database' });
    }
  },
  
  updateManager: async (req, res) => {
    const { id } = req.params;
    try {
      const manager = await Manager.findByPk(id);
      if (!manager) {
        return res.status(404).json({ error: 'Manager not found' });
      } 
  
      await manager.update(req.body);
  
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
  
      await manager.destroy();
  
      return res.status(200).json({ message: 'Manager deleted successfully' });
    } catch (error) {
      console.error('Error deleting manager:', error);
      return res.status(500).json({ error: 'Error deleting manager' });
    }
  },
  

//IMPLEMENT ALL BELOW
createPromo: async (req, res) => {
  const { title, description, startDate, endDate } = req.body;

  try {
    const promo = await Promo.create({ title, description, startDate, endDate });

    // Placeholder: Send email to investors who have not invested yet
    const investors = await Investor.findAll({ where: { hasInvested: false } });
    investors.forEach(async (investor) => {
      // SendEmailFunction(investor.email, `New Promo: ${title}`, `Description: ${description}`);
      // Placeholder: Create notification for the investor
      await Notification.create({ investorId: investor.id, message: `New Promo: ${title}` });
    });

    return res.status(201).json({ message: 'Promo created successfully', promo });
  } catch (error) {
    console.error('Error creating promo:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
},

updatePromo: async (req, res) => {
  const { id } = req.params;
  const { title, description, startDate, endDate } = req.body;

  try {
    const promo = await Promo.findByPk(id);
    if (!promo) {
      return res.status(404).json({ error: 'Promo not found' });
    }

    await promo.update({ title, description, startDate, endDate });

    // Placeholder: Send email to investors who have not invested yet
    const investors = await Investor.findAll({ where: { hasInvested: false } });
    investors.forEach(async (investor) => {
      // SendEmailFunction(investor.email, `Updated Promo: ${title}`, `Updated Description: ${description}`);
      // Placeholder: Create notification for the investor
      await Notification.create({ investorId: investor.id, message: `Updated Promo: ${title}` });
    });

    return res.status(200).json({ message: 'Promo updated successfully', promo });
  } catch (error) {
    console.error('Error updating promo:', error);
    return res.status(500).json({ error: 'Error updating promo' });
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