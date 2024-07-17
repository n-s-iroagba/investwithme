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
    <div className=' full-height px-3 pt-5'>
          {showWallets ?
           <>
           <div className='d-flex flex-column align-items-center'>
             <button className='button-styles button-width-narrow text-light' onClick={handleToggle}>Add Wallet</button>
             <AdminWalletLayout />
             </div>
             
            </>
            :
            <>
          <div className='d-flex flex-column align-items-center'>
            <button className='button-styles button-width-narrow'onClick={handleToggle}>View Wallets</button>
            <WalletForm />
            </div>
              
            </>
          }
               <div className='d-flex justify-content-center'>
          <AdminDashboardButton/>
          </div >
      </div >
      <MiniFooter primaryVariant />
    </div>
  )

}


export default AdminWallets;
