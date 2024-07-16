import React, { useState } from 'react';

import ManagerForm from '../../features/manager/components/ManagerForm';
import '../../common/styles/styles.css'
import MiniFooter from '../../common/components/MiniFooter';
import AdminManagerCards from '../../features/manager/layout/AdminManagerCards';
import { AdminDashboardButton } from '../../common/components/Button';
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
            <button className='button-styles button-width-narrow text-light' onClick={handleToggle}>Add Manager</button>
            </div>
            <AdminManagerCards />
          </>
          :
          <>
          <div className='d-flex justify-content-center'>
            <button className='button-styles button-width-narrow' onClick={handleToggle}>View Managers</button>
            </div>
            <ManagerForm />
          </>
        }
          <div className='d-flex justify-content-center'>
      <AdminDashboardButton/>
      </div>
      </div>
      <MiniFooter primaryVariant={true} />
      </div>
  
    )
}
export default AdminManager;
