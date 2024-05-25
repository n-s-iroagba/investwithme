import { AdminWallet } from "../server/src/types/adminTypes";
import { Investment, Investor } from "../server/src/types/investorTypes";

export interface CreateManagerPayLoad{
    firstName: string;
    lastName: string;
    image:  Promise<Blob>;
    duration: number;
    qualification: string;
    minimumInvestmentAmount: number;
    percentageYield: number;
  }
  export interface ManagerData {
    id: number;
    firstName: string;
    lastName: string;
    image: string | Blob;
    duration: number;
    qualification: string;
    minimumInvestmentAmount: number;
    percentageYield: number;
  }
  export interface InvestorCreationPayLoad{ 
    lastName: string;
    firstName: string;
    password: string;
    email: string;
    dateOfBirth: Date;
    gender:string;
    country:string
    bank:string;
    referralCode?:number
  }
  export interface InvestmentCreationPayLoad{
    
      amount: number
      wallet: DepositWalletCreationPayLoad
      managerId: number

  }
  export interface PayInvestorPayLoad{
    address:string;
    amount:number;
  }

export interface  DepositWalletCreationPayLoad{
   currency: string;
   blockchain: string;
   network: string; 
   address: string;
}
export interface InvestorAndInvestment{
  investment:Investment
  investor:Investor
}