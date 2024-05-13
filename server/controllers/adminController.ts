import fs from 'fs';
import { PROMO_PERCENT, INVESTMENT_TENURE, REFERRAL_BONUS_PERCENT, COMPANY_NAME } from '../config';
import { Investment, Investor, Manager, Notification, } from '../types/investorTypes';
import { sendPromoExtensionMail, sendPromoMail } from '../mailService';
import multer from 'multer'
import { Request, Response } from 'express';
import { AdminWallet,Promo } from '../types/adminTypes';
import path from 'path';
import { customError } from '../helpers';

const storage = multer.diskStorage({
  destination: path.join(__dirname, '../images/'),
  filename: function (req, file, cb) {
    cb(null, req.body.firstName + req.body.lastName);
  },
});



export const upload =multer({
    storage: storage
  }).single('image')

export const  getAllInvestors= async (req: Request, res: Response): Promise<Response> => {
    try {
      const investors = await Investor.findAll({
        include: [{ model: Investment, as: 'Investment' }], // Assuming the association alias is 'Investment'
      });

      return res.status(200).json({ investors: investors });

    } catch (error: any) {

      console.error('Error in getAllInvestors function:', error);
      return res.status(error.status).json(error);
    }
  }

export  const  deleteInvestor= async (req: Request, res: Response) => {
    try {
      const investorId = req.params.id;
      const investor = await Investor.findByPk(investorId);

      if (!investor) {
        throw customError('investor to be deleted not found', 404)
      }

      await investor.destroy();

      res.status(200).json({ message: 'Investor deleted successfully' });

    } catch (error: any) {
      console.error('Error deleting investor:', error);
      res.status(error.status).json({ error: 'An error occurred while deleting the investor' });
    }
  }

  //Wallet
  export  const createAdminWallet= async (req: Request, res: Response): Promise<Response> => {
    try {
      const { address, blockchain, network, currency } = req.body;

      if (!blockchain || !address || !network || !currency) {
        console.log('blockchain', blockchain)
        console.log('address', address)
        console.log('network', network)
        console.log('currency', currency)
        throw customError('incomplete payload from client', 400)
      }

      const wallet = await AdminWallet.create({
        address,
        blockchain,
        network,
        currency,
      });

      return res.status(201).json({ message: 'Wallet created successfully', wallet });
    } catch (error: any) {
      console.error('Error createWalletAddress function:', error);
      return res.status(error.status).json(error);
    }
  }

  export  const getAllWallets= async (req: Request, res: Response): Promise<Response> => {
    try {
      const wallets = await AdminWallet.findAll();
      return res.status(200).json(wallets);
    } catch (error: any) {
      console.error('Error in getAllWallets function:', error);
      return res.status(error.status).json(error);
    }
  }

  export  const patchWallet= async (req: Request, res: Response): Promise<Response> => {
    const { id, address } = req.body;
    try {
      const wallet = await AdminWallet.findByPk(id);
      if (!wallet) {
        throw customError('wallet to be updated not found', 404)
      }
      console.log(wallet)
      wallet.address = address
      await wallet.save();
      return res.status(200).json({ message: 'Wallet address updated successfully', wallet });
    } catch (error: any) {
      console.error('Error in patchWallet function:', error);
      return res.status(error.status).json(error);
    }
  }

  export  const deleteWallet= async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    try {
      const wallet = await AdminWallet.findByPk(id);
      if (!wallet) {
        throw customError('wallet to be deleted not found', 404)
      }
      await wallet.destroy();
      return res.status(200).json({ message: 'Wallet address deleted successfully' });
    } catch (error: any) {
      console.error('Error deleteWallet function:', error);
      return res.status(error.status).json(error);
    }
  }


  //Manager
  export  const createManager= async (req: Request, res: Response): Promise<Response> => {
    const {
      lastName,
      firstName,
      minimumInvestmentAmount,
      percentageYield,
      qualification,
      duration
    } = req.body;

    if (!req.file || !req.file.path) {
      console.log('image file', req.file);
      console.log('image file path', req.file?.path);
      throw customError('no manager image in payload from client', 400)
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
        qualification,
        duration
      });
      if(manager){
        fs.unlinkSync(imagePath);
      }
      return res.status(201).json({ message: 'Manager created successfully', manager });
    } catch (error: any) {
      console.error('Error createManager function:', error);
      return res.status(error.status).json(error);
    }
  }


  export  const getAllManagers= async (req: Request, res: Response): Promise<Response> => {
    try {
      const managers = await Manager.findAll();
      return res.status(200).json(managers);
    } catch (error: any) {
      console.error('Error in getAllMangers function:', error);
      return res.status(error.status).json(error);
    }
  }

  export  const getSingleManager= async (req: Request, res: Response): Promise<Response> => {
    try {
      const {id} = req.params 
      const manager = await Manager.findByPk(id);
      if(!manager){
        throw customError(`manager to be updated with id ${id} not found in database`, 404)
      }
      return res.status(200).json(manager);
    } catch (error: any) {
      console.error('Error in getAllMangers function:', error);
      return res.status(error.status).json(error);
    }
  }
  export  const patchManager= async (req: Request, res: Response): Promise<Response> => {
    const {id} = req.params 
    const { lastName, firstName, minimumInvestmentAmount, percentageYield, duration } = req.body;
    try {
     
      const manager = await Manager.findByPk(id);
      if (!manager) {
        throw customError(`manager to be updated with id ${id} not found in database`, 404)
      }

      manager.lastName = lastName;
      manager.firstName = firstName;
      manager.minimumInvestmentAmount = minimumInvestmentAmount;
      manager.percentageYield = percentageYield;
      manager.duration = duration;
      await manager.save();

      return res.status(200).json({ message: 'Manager updated successfully' });
    } catch (error: any) {
      console.error('Error patchManager function:', error);
      return res.status(error.status).json(error);
    }
  }

  export  const deleteManager= async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    try {
      const manager = await Manager.findByPk(id);
      if (!manager) {
        throw customError(`manager to be deleted with id ${id} not found in database`, 404)
      }
      await manager.destroy();
      return res.status(200).json({ message: 'Manager deleted successfully' });
    } catch (error: any) {
      console.error('Error deleteManager funciton:', error);
      return res.status(error.status).json(error);
    }
  }


  //IMPLEMENT ALL BELOW
  export const createPromo = async (req: Request, res: Response): Promise<Response> => {
    const { startDate, endDate } = req.body;
  
    try {
      const promo = await Promo.create({ startDate, endDate });
      const investors = await Investor.findAll({ where: { hasInvested: false } });
 
      for (const investor of investors) {
        await sendPromoMail(investor, startDate, endDate, PROMO_PERCENT);
        await Notification.create({
          investorId: investor.id,
          title: 'Promo Notification',
          message: `We are thrilled to announce an exclusive promotional period for you! 
          The promotion will run from ${startDate} to ${endDate}. 
          Invest before ${endDate} and earn a bonus of ${100 * PROMO_PERCENT}% on your initial investment deposit.`
        });
      }
  
      return res.status(201).json({ message: 'Promo created successfully', promo });
    } catch (error: any) {
      console.error('Error createPromo:', error);
      return res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
    }
  }
  

  export  const updatePromo= async (req: Request, res: Response): Promise<Response> => {
    
    const {id,days } = req.body;
    try {
      const promo = await Promo.findByPk(id)
      if (!promo) {
        throw customError(`promo to be updated with id ${id}  not found in database`, 404)
      }
     

      const dateObject = new Date(promo.endDate);

      dateObject.setDate(dateObject.getDate() + days).toString();


      promo.endDate = dateObject.toLocaleDateString('en-US')
      promo.save();

      const investors = await Investor.findAll({ where: { hasInvested: false } });
   
      investors.forEach(async (investor:Investor) => {
        await sendPromoExtensionMail(investor, promo.startDate, promo.endDate, PROMO_PERCENT)
        await Notification.create({
          investorId: investor.id, title: 'Promo Extension', message: `We are thrilled to announce the extension of our exclusive promotional period for you! 
    The promotion will run from ${promo.startDate} to ${promo.endDate}.Invest before the ${promo.endDate} and earn a bonus of ${100 * PROMO_PERCENT}% on your initial investment deposit`
        });
      });

      return res.status(200).json({ message: 'Promo updated successfully', promo });
    } catch (error: any) {
      console.error('Error updating promo:', error);
      return res.status(error.status).json({ error: 'Error updating promo' });
    }
  }

  export  const getPromos= async (req: Request, res: Response): Promise<Response> => {
    try {
      const promos = await Promo.findAll()
     
     return res.status(200).json(promos)
    } catch (error:any) {
      console.error('Error in getPromos function:', error);
      return res.status(error.status).json({ error: 'Error getting promo from database' });
    }
  }

  export  const  deletePromo= async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    try {
      const promo = await Promo.findByPk(id)
      if (!promo) {
        throw customError(`promo to be deleted with id ${id}  not found in database`, 404)
      }
      await promo.destroy();
      return res.status(200).json({ message: 'Promo deleted successfully' });
      
    } catch (error: any) {
      console.error('Error deletePromo function:', error);
      return res.status(error.status).json(error) 
    }
    }
  





