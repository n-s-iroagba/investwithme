import { useEffect, useState } from "react";
import { getAdminWallets } from "../../wallet/helpers/walletHelper"
import {WalletDto} from '../../../../../common/walletTypes'


const useGetAdminWallets = (): { wallets: WalletDto[], errorMessage: string } => {
    const [wallets, setWallets] = useState<WalletDto[]>([]);
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