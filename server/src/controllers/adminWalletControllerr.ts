import { Request, Response } from 'express';
import { customError } from '../helpers';
import { AdminWallet } from '../types/adminTypes';

export const createAdminWallet = async (req: Request, res: Response): Promise<Response> => {
  console.log(req)
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
    return res.status(error.status || 500).json(error);
  }
}

export const getAllWallets = async (req: Request, res: Response): Promise<Response> => {
  try {
    const wallets = await AdminWallet.findAll();
    return res.status(200).json(wallets);
  } catch (error: any) {
    console.error('Error in getAllWallets function:', error);
    return res.status(error.status || 500).json(error);
  }
}

export const patchWallet = async (req: Request, res: Response): Promise<Response> => {
  const { id, address } = req.body;
  console.log(req.body)
  try {
    const wallet = await AdminWallet.findByPk(id);
    if (!wallet) {
      throw customError('wallet to be updated not found', 404)
    }
    wallet.address = address
    await wallet.save();
    return res.status(200).json({ message: 'Wallet address updated successfully', wallet });
  } catch (error: any) {
    console.error('Error in patchWallet function:', error);
    return res.status(error.status || 500).json(error);
  }
}

export const deleteWallet = async (req: Request, res: Response): Promise<Response> => {
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
    return res.status(error.status || 500).json(error);
  }
}







