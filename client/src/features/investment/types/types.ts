import { Manager, ManagerDto } from "../../../../../common/managerType";
import { WalletDto } from "../../../../../common/walletTypes";
import { Investment } from "../../../../../server/src/types/investorTypes";

export interface CreateInvestmentOptions{
    managers:ManagerDto[]
    wallets:WalletDto[]
}
export interface PortfolioDto{
    investment:Investment,
    manager:Manager,
    referrals:{totalAmount:number,count:number}
  }