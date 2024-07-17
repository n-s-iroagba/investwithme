import { Request, Response } from 'express';
import { Investment, Investor } from '../types/investorTypes';
// import { InvestorAndInvestment } from '../../../../common/compositeTypes';
import { customError } from '../helpers/commonHelpers';

export const getAllInvestors = async (req: Request, res: Response): Promise<Response> => {
    try {
      const investors = await Investor.findAll();
      if (!investors.length) {
        throw customError('There are no investors in the database', 404);
      }
  
      const investorsWithInvestments:any[] = [];
  
      for (const investor of investors) {
        let investment = await Investment.findOne({
          where: { investorId: investor.id },
        });
  
        if (!investment) {
          investment = {
            id: '0', // Ensure ID is of string type if it's a string in your database
            amount: 0,
            earnings: 0,
            amountDeposited: 0,
            investmentDate: null,
            isPaused: false,
            investorId: investor.id,
            investor: investor,
            managerId: 0,
          } as unknown as Investment;
        }
  
        investorsWithInvestments.push({
          investor: investor,
          investment: investment,
        });
      }
  
      return res.status(200).json(investorsWithInvestments);
  
    } catch (error: any) {
      console.error('Error in getAllInvestors function:', error);
      return res.status(error.status || 500).json({ error: error.message });
    }
  };

export const deleteInvestor = async (req: Request, res: Response) => {
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
    res.status(error.status||500).json({ error: 'An error occurred while deleting the investor' });
  }
}