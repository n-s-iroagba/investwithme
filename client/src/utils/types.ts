

export interface PromoType{
  id:number;
  startDate: string,
  bonusPercentage:number,
  durationInDays:number,
}



export interface EditWalletType{
  id:number
  blockchain:string,
  address:string
  network:string,
  currency:string
}

export interface CreateInvestmentType{
  wallet:WalletType,

  amount:number
  manager:ManagerType
}
export interface InvestmentEntryType{

  managers:ManagerType[]
  wallets:WalletType[]
}
export interface InvestmentType{
    id?:number,
    name:string
    commenceDate:string,
    amount:string,
    amountDeposited:number,
    profit:number,
    wallet:WalletType,
    dueDate:string,
    investmentManager:string
    percentageYield:number
}



export interface TransactionType{
  id?:number,
  amount:string,
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
  blockchain:string,
  address:string
  network:string,
  currency:string
}
export interface ManagerType {
  id?: number,
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
    name:string
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
  