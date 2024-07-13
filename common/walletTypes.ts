export interface CreateWalletDto{
    address:string
    currency:string
}
export interface WalletDto extends CreateWalletDto{
    id: number

}