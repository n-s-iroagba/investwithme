


export interface PromoType{
  id:number;
  startDate: string,
  bonusPercentage:number,
  durationInDays:number,
}



export interface CreateWalletType{
  blockchain:string,
  address:string
  network:string,
  currency:string
}

export interface CreateInvestmentType{
  wallet:CreateWalletType,

  amount:number
  manager:ManagerType
}

export interface PortfolioDataType {
  id: number;
  commenceDate: string;
  amount: number;
  earnings: number;
  amountDeposited: number;
  durationInDays: number;
  numberOfDeposits: number;
  wallet: {
    network: string;
    blockchain: string;
    address: string;
    currency: string;
  };
  dueDate: string;
  manager: {
    firstName: string;
    lastName: string;
  };
  dailyEarningPercentage: number;
  referral: {
    totalAmount: number;
    count: number;
  };
};

export interface CryptoDataType{
  networks:string[],
  blockchains:string[],
  currencies:string[]
}

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
  'Investment Deposit'|'Incomplete Investment Deposit'|'Investment Paused' |'Investment Continued'|'Promo'|'Promo Extension'|'Incomplete Deposit'
  message:string
}

export interface WalletType{
  id:number,
  blockchain:string,
  address:string
  network:string,
  currency:string
}
export interface ManagerType {
  id: number,
    firstName: string,
    lastName: string,
    minimumInvestmentAmount: number
    percentageYield: number
    duration:number
    image: any,
    qualification: string
  }

export interface DecodedToken {
    id: string;
    role: 'admin'|'investor';
    hasInvested?:boolean;
    username:string
    verificationStatus:'verified'|'verifying'
    email:string
  }   

export interface AdminAuthorizationData{
    authorised:boolean;
    name:string
    verificationStatus:'verified'|'verifying'
    role:'admin'
    email:string
}

export interface AuthorizationData extends DecodedToken {
    authorised: boolean;
  }


  export interface InvestmentTiersType{
    firstName: string,
    lastName: string,
    minimumInvestmentAmount:string,
    percentageYield: string,
    duration:string,
    image: string,
    qualification: string
    button: React.ReactNode,
    deleteButton?: React.ReactNode;
  }
  