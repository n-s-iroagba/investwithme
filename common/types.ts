import { AdminWallet } from "../server/src/types/adminTypes";
import { Investment, Investor } from "../server/src/types/investorTypes";
import { afterAll } from '@jest/globals';

export interface CreateManagerPayLoad{
    firstName: string;
    lastName: string;
    image:  Blob|string|Promise<Blob>;
    duration: number;
    qualification: string;
    minimumInvestmentAmount: number;
    percentageYield: number;
  }
  export interface ManagerData {
    id: number;
    firstName: string;
    lastName: string;
    image:  Blob|string|Promise<Blob>;
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
      wallet:{currency:string,address:string}
      managerId: number

  }
  export interface PayInvestorPayLoad{
    address:string;
    amount:number;
  }

export interface  DepositWalletCreationPayLoad{
   currency: string; 
   address: string;
}
export interface InvestorAndInvestment{
  investment:Investment
  investor:Investor
}

export interface Portfolio{
  investment:Investment,
  manager:ManagerData,
  referrals:{totalAmount:number,count:number}
}
export interface ReferralDetails{
  referred: {firstName:string,lastName:string}[]
  referrer: {firstName:string,lastName:string}
  referralCode:number
}