import React, { useState } from 'react';
import {  EditManagerType } from '../../utils/types';
import AdminInvestmentManagersCard from '../../components/admin/AdminInvestmentManagersCard';
import ManagerForm from '../../components/forms/ManagerForm';
import '../../components/styles.css'
import AdminWallet from '../../components/admin/AdminWallet';
const AdminWallets: React.FC = () => {
  const [showManagers, setShowManagers] = useState<boolean>(true)
  const managerInitData:EditManagerType = {
    firstName: '',
    lastName: '',
    minimumInvestmentAmount: 0,
    percentageYield: 0,
    duration: 0,
    image: null,
    qualification: ''
  };
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
