




export interface EditWalletType{
  id:number
  blockchain:string,
  address:string
  network:string,
  currency:string
}
export interface DepositsType{
    id?:number
    date:string,
    amount:number,
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
    deposits:DepositsType[]
    investmentManager:string
    percentageYield:number
}


export interface NotificationType{
  id:number
  title:string
  message:string
}

export interface WalletType{
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

export interface EditManagerType {
  id?:number
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
    role: string;
    hasInvested?:boolean;
    name:string
  }
export interface AdminDecodedToken{
    id: string;
    role: string;
    name:string 
}
export interface AdminAuthorizationData{
    authorised:boolean;
    name:string
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
  