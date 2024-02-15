const Investor = require('../models/investor');
const { Wallet } = require('../models');
const bcrypt = require('bcrypt');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Destination directory for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Rename the file with timestamp prefix
  }
});

// Multer file upload configuration
const upload = multer({ storage: storage });

module.exports = {
  createAdmin: async (email, password) => {
    try {
      const existingAdmin = await Admin.findOne({ where: { email } });
      if (existingAdmin) {
        throw new Error('Admin with this email already exists');
      }
      const hashedPassword = await bcrypt.hash(password, 10); 
      const admin = await Admin.create({ email, password: hashedPassword });
      const jwToken = jwt.sign({ id: investor.id, email: investor.email }, JWT_SECRET);
      return res.status(200).json({ jwToken });    ;
    } catch (error) {
      throw new Error(`Error creating admin: ${error.message}`);
    }
    
  },

loginAdmin : async (email, password) => {
  try {
    const admin = await Admin.findOne({ where: { username } });
    if (!admin) {
      return null;
    }
    const passwordsMatch = await bcrypt.compare(password, admin.password);
    if (passwordsMatch) {
      const jwToken = jwt.sign({ id: investor.id, email: investor.email }, JWT_SECRET);
      return res.status(200).json({ jwToken });    
    } else {
      return res.status(400).json({message:'wrong password'});
    }
  } catch (error) {
    throw new Error(`Error logging in admin: ${error.message}`);
  }
},

  //investor
  addInvestmentAmount: async (req, res) => {
    try {
      const { walletAddress, investmentAmount, intendedManagerId } = req.body;
      const wallet = await Wallet.findOne({ where: { address: walletAddress } });
      if (!wallet) {
        return res.status(404).json({ error: 'Wallet address not found' });
      }
      const investor = await Investor.findOne({ where: { id: wallet.investorId } });
      if (!investor) {
        return res.status(404).json({ error: 'Investor not found' });
      }

      let manager;
      if (!investor.managerId) {
        const newInvestorInvestmentAmount = 1.17 * investmentAmount;
        manager = await Manager.findByPk(intendedManagerId);
        if (!manager) {
          throw new Error('the manager the investor chose is  not the database');
        }
        if (
          newInvestorInvestmentAmount >= manager.minimumInvestmentAmount &&
          newInvestorInvestmentAmount <= manager.maximumInvestmentAmount
        ) {
          investor.managerId = manager.id;
          investor.incrementPercent = manager.incrementPercent;
          await sendNewInvestorInvestmentMail(manager, investmentAmount, 0, investor, false);
        } else {
          const newManager = await Manager.findOne({
            where: {
              minimumInvestmentAmount: { [Op.lte]: newInvestorInvestmentAmount },
              maximumInvestmentAmount: { [Op.gte]: newInvestorInvestmentAmount },
            },
            order: [['id', 'ASC']],
          });
          if (!newManager) {
            investor.managerId = manager.id;
          investor.incrementPercent = manager.incrementPercent;
          }else{
          manager = newManager
          investor.managerId = manager.id;
          investor.incrementPercent = manager.incrementPercent;
          await sendNewInvestorInvestmentMail(manager, investmentAmount, 0, investor, true);
          }
        }
        investor.investmentAmount = newInvestorInvestmentAmount;
      } else {
        const totalInvestmentValue = investor.investmentValue + investmentAmount;
        manager = await Manager.findByPk(investor.managerId);
        if (!manager) {
          throw new Error('Current manager not found');
        }
        if (totalInvestmentValue > manager.maximumInvestmentAmount) {
          const nextManager = await Manager.findOne({
            where: {
              minimumInvestmentAmount: { [Op.lte]: totalInvestmentValue },
              maximumInvestmentAmount: { [Op.gte]: totalInvestmentValue },
            },
            order: [['minimumInvestmentAmount', 'ASC']],
          });
          if (nextManager) {
            manager = nextManager;
            investor.managerId = manager.id;
            await sendNewInvestorInvestmentMail(manager, investmentAmount, investor.investmentAmount, investor, true);
          } else {
            await sendNewInvestorInvestmentMail(manager, investmentAmount, investor.investmentAmount, investor, false);
          }
        } else {
          await sendNewInvestorInvestmentMail(manager, investmentAmount, investor.investmentAmount, investor, false);
        }
        investor.investmentValue = totalInvestmentValue;
        investor.incrementPercent = 0.1 + manager.incrementPercent;
      }
      await investor.save();
      const transaction = await Transaction.create({
        investorId: investor.id,
        amount: investmentAmount,
        type: 'credit',
        dateTime: new Date().toLocaleString('en-US', { timeZone: investor.timeZone }),
      });
      await transaction.save()
      return res.status(200).json({ message: 'Investment amount added successfully' });
    } catch (error) {
      console.error('Error adding investment amount:', error);
      return res.status(500).json({ message: 'Error adding investment amount' });
    }
  },
 getAllInvestors:async (req, res) => {
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
  createAdminWallet:async (res,req) => {
    const {address,type,currency} = req.body
    const {id} = req.params
      try {
          // Create a new wallet instance
          const wallet = await AdminWallet.create({
              address: address,
              type: type,
              currency: currency
              
          });
          wallet.save();
          return res.status(200).json({message:`admin ${currency} wallet created`})
      } catch (error) {
          // Handle errors if any
          console.error('Error creating wallet:', error);
          throw error;
      }
  },
 getAllWallets: async (req, res) => {
    try {
      const wallets = await Wallet.findAll();
      return res.status(200).json({ wallets: wallets });
    } catch (error) {
      console.error('Error fetching wallets:', error);
      return res.status(500).json({ error: 'Error fetching wallets' });
    }
  },
  updateWalletAddressById: async (req, res) => {
    const { id } = req.params; 
    const { address } = req.body; 
    try {
      const wallet = await Wallet.findByPk(id);
      if (!wallet) {
        return res.status(404).json({ error: 'Wallet not found' });
      }
      wallet.address = address;
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
 createManager :async (req, res) => {
  try {
    const { name, email, otherAttribute } = req.body;

    let imageFilePath = null;
    if (req.file) {
      imageFilePath = req.file.path;
    }

    const manager = await Manager.create({
      name: name,
      email: email,
      otherAttribute: otherAttribute,
      image: imageFilePath,
    });

    return res.status(201).json({ message: 'Manager created successfully', manager: manager });
  } catch (error) {
    console.error('Error creating manager:', error);
    return res.status(500).json({ error: 'Error creating manager' });
  }
},
getAllManagers : async (req, res) => {
  try {
    const managers = await Manager.findAll();
    return res.status(200).json({ managers: managers });
  } catch (error) {
    console.error('Error fetching managers:', error);
    return res.status(500).json({ error: 'Error getting  managers from database' });
  }
},
updateManager : async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, otherAttribute } = req.body;

    let imageFilePath = null;
    if (req.file) {

      imageFilePath = req.file.path;
    }
    const manager = await Manager.findByPk(id);
    if (!manager) {
      return res.status(404).json({ error: 'Manager not found' });
    }s
    manager.name = name;
    manager.email = email;
    manager.otherAttribute = otherAttribute;
    if (imageFilePath) {
      manager.image = imageFilePath;
    }
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

      await manager.destroy();r

      return res.status(200).json({ message: 'Manager deleted successfully' });
  } catch (error) {
      console.error('Error deleting manager:', error);
      return res.status(500).json({ error: 'Error deleting manager' });
  }

},
}

