import { useEffect, useState } from "react";
import { getAdminWallets } from "../../wallet/helpers/walletHelper"
import {WalletDto} from '../../../../../common/walletTypes'


const useGetAdminWallets = (): { wallets: WalletDto[]|null, errorMessage: string } => {
    const [wallets, setWallets] = useState<WalletDto[]|null>(null);
    const [errorMessage, setErrorMessage] = useState('');
  
    useEffect(() => {
      const fetchWalletData = async () => {
        try {
          const walletData = await getAdminWallets();
          if (walletData) {
            setWallets(walletData);
          }
        } catch (error) {
          console.error(error);
          setErrorMessage('Error fetching wallets');
        }
      };
  
      fetchWalletData();
    }, []); 
  
    return {
      wallets,
      errorMessage,
    };
  };
  
  export default useGetAdminWallets;