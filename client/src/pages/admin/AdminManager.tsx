import React, { useState } from 'react';
import AdminInvestmentManagersCard from '../../components/admin/AdminInvestmentManagersCard';
import ManagerForm from '../../components/forms/ManagerForm';
import '../../components/styles.css'
import { MiniFooter } from '../../components/home_components/Footer';
const AdminManager: React.FC = () => {
  const [showManagers, setShowManagers] = useState<boolean>(true)

  const handleToggle = () => {
    setShowManagers(!showManagers)
  }
  return (
    <div className='primary-background'>
    <div className=' full-height px-3 pt-5'>
  
        {showManagers ?
          <>
          <div className='d-flex justify-content-center'>
            <button className='button-styles button-width-narrow' onClick={handleToggle}>Add Manager</button>
            </div>
            <AdminInvestmentManagersCard />
          </>
          :
          <>
          <div className='d-flex justify-content-center'>
            <button className='button-styles button-width-narrow' onClick={handleToggle}>View Managers</button>
            </div>
            <ManagerForm />
          </>
        }
      </div>
      <MiniFooter primaryVariant={true} />
      </div>
  
    )
}
export default AdminManager;
