import React, { useState } from 'react';
import {  EditManagerType } from '../../utils/types';
import AdminInvestmentManagersCard from '../../components/admin/AdminInvestmentManagersCard';
import ManagerForm from '../../components/forms/ManagerForm';


const AdminManager: React.FC = () => {
  const [showManagers, setShowManagers] = useState<boolean>(true)
  const managerInitData:EditManagerType = {
    firstName: '',
    lastName: '',
    minimumInvestmentAmount: 0,
    percentageYield: 0,
    duration: 0,
    image: '',
    qualification: ''
  };
  const handleToggle = () => {
    setShowManagers(!showManagers)
   
  }
  return (
    <div>
      {showManagers ?

        <div>
          <button onClick={handleToggle}>Add Manager</button>

          <AdminInvestmentManagersCard />
        </div>
        :
        <div>
          <button onClick={handleToggle}>View Managers</button>

          <ManagerForm details={managerInitData} />
        </div>
      }
    </div >)

}


export default AdminManager;
