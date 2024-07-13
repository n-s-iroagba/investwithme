import { Investment, Investor } from "../server/src/types/investorTypes";
import { CreateWalletDto } from "./walletTypes";
import { Manager, ManagerDto } from "./managerType";




export interface InvestorAndInvestment{
  investment:Investment
  investor:Investor
}



export interface CreateInvestmentDto{
  wallet:CreateWalletDto
  amount:number
  managerId: number
}

export interface ReadableItem {
  read: boolean|null;
}