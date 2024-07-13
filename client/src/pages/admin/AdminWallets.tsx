import React, { useState } from 'react';
import MiniFooter from '../../common/components/MiniFooter';
import WalletForm from '../../features/wallet/layout/WalletForm';
import AdminWallet from '../../features/wallet/layout/AdminWallet';
import '../../common/styles/styles.css'

const AdminWallets: React.FC = () => {
  const [showWallets, setShowWallets] = useState<boolean>(true)

  const handleToggle = () => {
    setShowWallets(!showWallets)

  }
  return (
  <div className='primary-background'>
      <div className=' px-3 pt-5 full-height'>
        <div className='d-flex flex-column align-items-center'>
          {showWallets ?
            <>
              <button className='button-styles button-width-narrow text-light' onClick={handleToggle}>Add Wallet</button>
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
    </div>
  )

}


export default AdminWallets;
