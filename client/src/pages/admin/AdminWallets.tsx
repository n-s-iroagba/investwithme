import React, { useState } from 'react';
import '../../components/styles.css'
import AdminWallet from '../../components/admin/AdminWallet';
import WalletForm from '../../components/forms/WalletForm';
import { MiniFooter } from '../../components/home_components/Footer';
const AdminWallets: React.FC = () => {
  const [showWallets, setShowWallets] = useState<boolean>(true)

  const handleToggle = () => {
    setShowWallets(!showWallets)

  }
  return (
    <>
      <div className='primary-background px-3 pt-5 full-height'>
        <div className='d-flex flex-column align-items-center'>
          {showWallets ?
            <>
              <button className='button-styles button-width-narrow' onClick={handleToggle}>Add Wallet</button>
              <AdminWallet />
            </>
            :
            <>
              <button className='button-styles button-width-narrow' onClick={handleToggle}>View Wallets</button>
              <WalletForm />
            </>
          }

        </div>
      </div >
      <MiniFooter primaryVariant />
    </>
  )

}


export default AdminWallets;
