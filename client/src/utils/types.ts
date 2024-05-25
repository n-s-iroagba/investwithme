import {ManagerData} from "../../../common/types"


export interface PromoType{
  id:number;
  startDate: string,
  bonusPercent:number,
  endDate:string,
}
export interface CreatePromoType{
  startDate: string,
  bonusPercent:number,
  endDate:string,
}

export interface CreateWalletType{
  blockchain:string,
  address:string
  network:string,
  currency:string
}

export interface WalletType{
  id:number
  blockchain:string,
  address:string
  network:string,
  currency:string
}


export interface CreateInvestmentType{
  wallet:CreateWalletType,
  amount:number
  manager:ManagerData
}

export interface PortfolioDataType {
  investment:{id: number;
    investmentDate: string;
    amount: number;
    earnings: number;
    amountDeposited: number;
    durationInDays: number;
    dueDate: string;
    incrementPercent: number;}
    wallet: {
      id: number;
      network: string;
      blockchain: string;
      address: string;
      currency: string;
    };
   
    manager: {
      firstName: string;
      lastName: string;
    };
   
    referral: {
      totalAmount: number;
      count: number;
    };
};


export interface AdminInvestorType {
  id: number;
  firstName: string;
  lastName: string;
  hasInvested: boolean;
  withdrawalDate: string;
  completeDeposit: boolean;
  dueForWithdrawal: boolean;
}
export interface ReadableItem {
  read: boolean|null;
}
export interface ReferralType{
  firstName: string;
  lastName: string;
  walletAddress: string;
  amount: number;
  currency: string;
  id: number;
};
export interface BonusType {
  firstName: string;
  lastName: string;
  walletAddress: string;
  amount: number;
  currency: string;
  id: number;
}

export interface TransactionType extends ReadableItem {
  id?:number,
  amount:number,
  type:'Debit'|'Credit'
  participatingAccount: 'Cassock'|'Your Wallet'
  narration:'Referral bonus imbursement'|'Promo bonus imbursement'|'Investment Deposit'
  date:Date

}

export interface NotificationType extends ReadableItem {
  id:number
  title:'Earnings'|'Bonus Payout'|'How To Deposit'|'Referral Registration'|'Referral bonus imbursement'|'Bonus imbursement'|
  'Investment Deposit'|'Incomplete Investment Deposit'|'Investment Paused' |'Investment Continued'|'Promo Notification'
  message:string

}
export interface AddInvestmentType {
  address:string
  amount:number
}
export interface DecodedLoginToken {
    id: string;
    role:'investor';
    hasInvested:boolean;
    username:string
    verificationStatus:boolean
    email:string
  }   

export interface AdminDecodedLoginToken{
    username:string
    verificationStatus:boolean
    role:'admin'
    email:string
}
export interface EmailVerificationToken{
  id:number,
  timeOfCreation:string,
}
  export interface InvestmentTiersType{
    firstName: string,
    lastName: string,
    minimumInvestmentAmount:string,
    percentageYield: string,
    duration:string,
    image: any,
    qualification: string
    button: React.ReactNode,
    deleteButton?: React.ReactNode;
  }
  