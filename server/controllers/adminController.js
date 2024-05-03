const multer  = require('multer');
const path = require('path');
const fs = require('fs');

const {PROMO_PERCENT,INVESTMENT_TENURE,REFERRAL_BONUS_PERCENT, COMPANY_NAME} = require('../config')
const {Investor,Manager,Notification,AdminWallet,Promo,Newbies} = require('../model');
const {findManagerWithHighestMinInvestment} =require('../helpers');
const { duration } = require('moment');

const storage = multer.diskStorage({
  destination: '../images/',
  filename: function (req, file, cb) {
    cb(null, req.body.firstName+req.body.lastName)
  }
})

module.exports = {

  upload:multer({
    storage: storage
  })
  .single('image'),
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
    console.log(req)
    try {
      const { address, blockchain, network,currency } = req.body;
  
      if (!blockchain || !address) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
  
      const wallet = await AdminWallet.create({
        address,
        blockchain,
        network,
        currency,
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
      console.log(wallets);
      return res.status(200).json(wallets);
    } catch (error) {
      console.error('Error fetching wallets:', error);
      return res.status(500).json({ error: 'Error fetching wallets' });
    }
  },
  
  patchWallet: async (req, res) => {
   console.log('hi')
    const { id,address} = req.body;
    console.log(address)
    try {
      const wallet = await AdminWallet.findByPk(id);
      if (!wallet) {
        return res.status(404).json({ error: 'Wallet not found' });
      }
  
      wallet.address = address
   
      
      await wallet.save();
      return res.status(200).json({ message: 'Wallet address updated successfully', wallet });
    } catch (error) {
      console.error('Error updating wallet address:', error);
      return res.status(500).json({ error: 'Failed to update wallet address' });
    }
  },
  
  deleteWallet: async (req, res) => {
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
      minimumInvestmentAmount,
      percentageYield,
      country,
      duration
    } = req.body;

    if (!req.file || !req.file.path) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    const imagePath = req.file.path; // Get the path of the uploaded image
  
    try {
      const imageData = fs.readFileSync(imagePath);
  
      const manager = await Manager.create({
        lastName,
        firstName,
        image: imageData,
        minimumInvestmentAmount,
        percentageYield,
        country,
        duration
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
      return res.status(200).json( managers );
    } catch (error) {
      console.error('Error fetching managers:', error);
      return res.status(500).json({ error: 'Error getting managers from database' });
    }
  },
  getSingleManager: async (req, res) => {
    const {id} = req.params
    try {
      const manager = await Manager.findByPk(id);
      return res.status(200).json( manager );
    } catch (error) {
      console.error('Error fetching manager:', error);
      return res.status(500).json({ error: 'Error getting managerfrom database' });
    }
  },
  
   patchManager: async (req, res) => {
 
    const { id, lastName, firstName, minimumInvestmentAmount, percentageYield, country, duration } = req.body;
    try {
     
      const manager = await Manager.findByPk(id);

    if (!manager) {
      return res.status(404).json({ error: 'Manager not found' });
    }

      manager.lastName = lastName;
      manager.firstName = firstName;
      manager.minimumInvestmentAmount = minimumInvestmentAmount;
      manager.percentageYield = percentageYield;
      manager.country = country;
      manager.duration = duration;
      await manager.save();
  
      return res.status(200).json({ message: 'Manager updated successfully' });
    } catch (error) {
      console.error('Error updating manager:', error);
      return res.status(500).json({ error: 'Error updating manager' });
    }
  },
  
  
  
  deleteManager: async (req, res) => {
    const { id } = req.params;
    try {
      const manager = await Manager.findByPk(id);
      await manager.destroy();
      return res.status(200).json({ message: 'Manager deleted successfully' });
    } catch (error) {
      console.error('Error deleting manager:', error);
      return res.status(500).json({ error: error.messag});
    }
  },
  

//IMPLEMENT ALL BELOW
createPromo: async (req, res) => {
  const {  startDate, endDate } = req.body;

  try {
    const promo = await Promo.create({ startDate, endDate });

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
  const { days } = req.body;
  console.log('hi')

  try {
    const promo = await Promo.findOne()
    if (!promo) {
      return res.status(404).json({ error: 'Promo not found' });
    }

    const dateObject = new Date(promo.endDate);

dateObject.setDate(dateObject.getDate() + days);
const newDateString = dateObject.toISOString().split('T')[0];

promo.endDate = newDateString
promo.save();


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

getPromo: async (req, res)=>{
try{
  const promo = await Promo.findOne()
  if (promo){
  return res.status(200).json(promo)
  }else{
    return res.status(404).json({message: 'Promo not found'})
  }
}catch(error){
  console.error('Error fetching promo:', error);
  return res.status(500).json({ error: 'Error getting promo from database' });
}
},

deletePromo: async (req, res) => {
  try{
    const promo = await Promo.findOne()
    if (promo){
      promo.destroy();
      return res.status(200)
      }else{
        return res.status(404).json({message: 'Promo not found'})
      }
  }catch(error){
    console.error('Error deleting promo:', error);
    return res.status(500).json({ error: 'Error deleting promo from database' });
  }
},
getNewbies : async  (req, res) => {
  try{
    const newbie = await Newbies.findOne()
    const responseNewbie = newbie
    newbie.promo = 0
    newbie.referral = 0
    newbie.investment=0
    newbie.save()
    return res.status(200).json(responseNewbie)
}catch(error){
  console.error('Error fetching newbies:', error);
  return res.status(500).json({ error: 'Error getting newbies from database' });
}
}
}

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