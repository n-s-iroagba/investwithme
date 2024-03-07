
const {Investor,Admin,Manager,AdminWallet,DepositWallet,WithdrawalWallet,Investment,Transaction,Withdrawal, TopUp,Notification}= require('../model')
const {sendVerificationEmail} = require('../service')
const bcrypt = require('bcrypt');
const multer = require('multer')
const jwt = require('jsonwebtoken');
const Investorcontroller = require('./Investorcontroller');
const JWT_SECRET = 'ababanna'
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Destination directory for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Rename the file with timestamp prefix
  }
});

const upload = multer({ storage: storage });

module.exports = {
//Auth
  createAdmin: async (req, res) => {
    const {name,email, password} =req.body
    try {
      const existingAdmin = await Admin.findOne({ where: { email } });
      if (existingAdmin) {
        return res.status(409).json({ message: 'Admin already exists' });
      }
      const hashedPassword = await bcrypt.hash(password, 10); 
      const admin = await Admin.create({name,email, password: hashedPassword });
      await sendVerificationEmail(admin);
      return res.status(201).json({admin,role:'admin'});    ;
    } catch (error) {
     return res.status(400).json({message:error.message});
    }
  },

loginAdmin : async (req, res) => {
  const {email, password} =req.body
  try {
    const admin = await Admin.findOne({ where: { email } });
    if (!admin) {
      return res.status(400).json({message:'admin not found'})
    }
    if (admin.verified===false){
      return res.redirect('http://localhost:3000/admin/verify-email')  
    }
    const passwordsMatch = await bcrypt.compare(password, admin.password);  
    if (passwordsMatch) {
      const jwToken = jwt.sign({ id: investor.id, email: investor.email }, JWT_SECRET);
      res.redirect('http://localhost:3000/admin/dashboard')
      return res.status(200).json({ jwToken });    
    } else {
      return res.status(400).json({message:'wrong password'});
    }
  } catch (error) {
    throw new Error(`Error logging in admin: ${error.message}`);
  }
},

verifyMail: async (req, res) => {
  const { token } = req.query;
  try {
    const decoded = jwt.verify(token, 'yourSecretKey');
    if (Date.now() >= decoded.exp * 1000) {
      return res.status(401).json({ error: 'Token expired. Please request a new one.' });
    }
    const investor = await Investor.findOne({ where: { verificationToken: token } });
    if (!investor) {
      return res.status(400).json({ error: 'Invalid verification token' });
     } 
     await investor.update({ verified: true, verificationToken: null });
      const jwToken = jwt.sign({ id: investor.id, email: investor.email }, JWT_SECRET);
      res.redirect('http://localhost:3000/admin/dashboard')
      res.status(200).json(jwToken)
  }catch (error) {
      console.error('Error verifying email:', error);
      return res.status(500).json({ error: 'An error occurred while verifying your email. Please try again later.' });
    }
  },

  confirmMailForPasswordChange: async (req, res) => {
    const { token } = req.query;
    try {
      const decoded = jwt.verify(token, 'yourSecretKey');
      if (Date.now() >= decoded.exp * 1000) {
        return res.status(401).json({ error: 'Token expired. Please request a new one.' });
      }
      const investor = await Investor.findOne({ where: { ChangePasswordToken: token } });
      if (!investor) {
        return res.status(400).json({ error: 'Invalid verification token' });
       } 
       await investor.update({ verified: true, verificationToken: null });
        const jwToken = jwt.sign({ id: investor.id, email: investor.email }, JWT_SECRET);
        res.redirect('http://localhost:3000/admin/change-password')
        res.status(200).json(jwToken)
    }catch (error) {
        console.error('Error verifying email:', error);
        return res.status(500).json({ error: 'An error occurred while verifying your email. Please try again later.' });
      }
    },

    changePassword : async (req, res) => {
      const id = request.params
      const {password} =req.body
      try {
        const admin = await Admin.findOne({ where: { id } });
        if (!admin) {
          return res.status(400).json({message:'admin not found'})
        }
        admin.password = await bcrypt.hash(password, 10)
          const jwToken = jwt.sign({ id: admin.id, role:'admin' }, JWT_SECRET);
          res.redirect('http://localhost:3000/admin/dashboard')
          return res.status(200).json({ jwToken });    
      } catch (error) {
        throw new Error(`Error logging in admin: ${error.message}`);
      }
    },

  //investor
  topUp: async (req, res) => {
    try {
      const { walletAddress, amount } = req.body;
      const investmentAmount = amount * 1.15;
      const wallet = await DepositWallet.findOne({ where: { address: walletAddress } });
  
      if (!wallet) {
        return res.status(404).send('Wallet not found.');
      }
  
      const investor = await Investor.findOne({
        include: [{
          model: Investment,
          include: [{
            model: TopUp,
            include: [{
              model: DepositWallet,
              where: { id: wallet.id }
            }]
          }]
        }]
      });
  
      if (!investor) {
        return res.status(404).send('Investor not found.');
      }
  
      const topUp = await TopUp.findByPk(investor.intendingTopUpId);
      if (!topUp) {
        return res.status(404).send('TopUp not found.');
      }
  
      topUp.amount = investmentAmount;
      topUp.time = new Date();
      await topUp.save();
  
      createTransaction(investor.id, investmentAmount, 'deposit');
  
      const investment = await Investment.findByPk(topUp.investmentId);
      if (!investment) {
        return res.status(404).send('Investment not found.');
      }
  
      let manager = await Manager.findByPk(investment.managerId);
      if (!manager) {
        return res.status(404).send('Manager not found.');
      }
  
      if (
        investmentAmount >= manager.minimumInvestmentAmount &&
        investmentAmount <= manager.maximumInvestmentAmount
      ) {
        investment.incrementPercent = manager.incrementPercent;
        await sendNewInvestmentMail(manager, investmentAmount, 0, investor, false);
      } else {
        manager = await findManagerForInvestment(investmentAmount) || manager;
        investor.managerId = manager.id;
        investor.incrementPercent = manager.incrementPercent;
        await sendinvestmentMail(manager, investmentAmount, 0, investor, true);
      }
  
     await Notification.create({time:new Date(),message:'hello this is top up notification'})

     return res.status(204)
    } catch (error) {
      console.error('Error during top-up:', error);
      res.status(500).send('An error occurred during the top-up process.');
    }
  },

payInvestors:async (req, res) => {
  try {
      const { walletAddress, amount } = req.body;

      const wallet = await DepositWallet.findOne({ where: { address: walletAddress } });

      const investor = await Investor.findOne({
          include: [
              {
                  model: Investment,
                  include: [
                      {
                          model: TopUp,
                          include: [
                              {
                                  model: DepositWallet,
                                  where: { id: wallet.id },
                              },
                          ],
                      },
                  ],
              },
          ],
      });

      await createTransaction(investor.id, amount, 'withdrawal');

      await sendPaymentMail(investor, amount);

      await Notification.create({ time: new Date(), message: 'hello this is payment notification' });

      return res.status(204)

  } catch (error) {

      console.error('Error occurred:', error.message);
      res.status(500).json({ error: 'Internal server error' });

  }
},


 getAllInvestors:async (_, res) => {
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
      try {
          await AdminWallet.create({
              address: address,
              type: type,
              currency: currency    
          });
          return res.status(201).json({message:`admin ${currency} wallet created`})
      } catch (error) {
          // Handle errors if any
          console.error('Error creating wallet:', error);
          throw error;
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
    const { address } = req.body; 
    try {
      const wallet = await AdminWallet.findByPk(id);
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

createPromo:async (req, res) => {
  try {
      const promo = await Promo.create(req.body);
      return res.status(201).json(promo);
  } catch (error) {
      return res.status(500).json({ error: error.message });
  }
},

getPromo:async (req, res) => {
  try {
      const promos = await Promo.findAll();
      return res.status(200).json(promos);
  } catch (error) {
      return res.status(500).send(error.message);
  }
},

}

const createTransaction = async (id,transactionAmount,type) => {
    if (type === 'withdrawal') {
      transactionAmount = -amount;
    } else if (type !== 'deposit') {
      return res.status(400).json({ error: 'Invalid transaction type' });
    }
    try{
    const transaction = await Transaction.create({
      InvestorId: id,
      amount: transactionAmount,
      type,
    });
  }catch (error){
    throw new Error (error)
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

