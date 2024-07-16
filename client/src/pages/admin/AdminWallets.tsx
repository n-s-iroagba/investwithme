import React, { useState } from 'react';
import MiniFooter from '../../common/components/MiniFooter';
import WalletForm from '../../features/wallet/layout/WalletForm';
import AdminWalletLayout from '../../features/wallet/layout/AdminWalletLayout';
import '../../common/styles/styles.css'
import { AdminDashboardButton } from '../../common/components/Button';

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
              <AdminWalletLayout />
            </>
            :
            <>
              <button className='button-styles button-width-narrow' onClick={handleToggle}>View Wallets</button>
              <WalletForm />
            </>
          }
          <AdminDashboardButton/>

        </div>
      </div >

      <MiniFooter primaryVariant />
    </div>
  )

}


export default AdminWallets;
