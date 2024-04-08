import React, { useState } from 'react';
import AdminInvestmentManagersCard from '../../components/admin/AdminInvestmentManagersCard';
import ManagerForm from '../../components/forms/ManagerForm';
import '../../components/styles.css'
const AdminManager: React.FC = () => {
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

          <AdminInvestmentManagersCard />
          </>
        :
       <>
          <button className='button-styles button-width-narrow' onClick={handleToggle}>View Managers</button>

          <ManagerForm patch={true} />
          </>
    
      }
          </div>
    </div >)

}


export default AdminManager;
