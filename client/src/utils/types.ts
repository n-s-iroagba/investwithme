


export interface PromoType{
  id:number;
  startDate: string,
  bonusPercentage:number,
  endDate:string,
}
export interface CreatePromoType{
  startDate: string,
  bonusPercentage:number,
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
export interface CreateManagerType {
  firstName: string,
  lastName: string,
  minimumInvestmentAmount: number
  percentageYield: number
  duration:number
  image: any,
  qualification: string
}
export interface ManagerType {
  id:number
  firstName: string,
  lastName: string,
  minimumInvestmentAmount: number
  percentageYield: number
  duration:number
  image: any,
  qualification: string
}
export interface CreateInvestmentType{
  wallet:CreateWalletType,
  amount:number
  manager:ManagerType
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
export interface TransactionType{
  id?:number,
  amount:number,
  type:'Debit'|'Credit'
  participantAccount:string
  narration:'Referral bonus imbursement'|'Promo bonus imbursement'|'Investment Deposit'
  date:string
}

export interface NotificationType{
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
  