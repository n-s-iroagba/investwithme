
export interface ManagerType {
    id:number,
    firstName:string,
    lastName:string,
    minimumInvestmentAmount:number,
    percentageYield:number, 
    duration:string,
    image:any,
    qualification:string
}

export interface WalletType{
    type:string,
    address:string
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


  