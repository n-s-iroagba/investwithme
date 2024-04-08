import React, { useState } from 'react';
import '../../components/styles.css'
import AdminWallet from '../../components/admin/AdminWallet';
const AdminWallets: React.FC = () => {
  const [showManagers, setShowManagers] = useState<boolean>(true)

  const handleToggle = () => {
    setShowManagers(!showManagers)
   
  }
  return (
  <div className='primary-background px-3 pt-5'>
            <div className='d-flex flex-column align-items-center'>
      {showManagers ?


          <>
          <button className='button-styles button-width-narrow' onClick={handleToggle}>Add Manager</button>

          <AdminWallet />
          </>
        :
       <>
          <button className='button-styles button-width-narrow' onClick={handleToggle}>View Managers</button>

         {/* <WalletForm/> */}
          </>
    
      }
          </div>
    </div >)

}


export default AdminWallets;
