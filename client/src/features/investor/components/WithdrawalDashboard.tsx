
import React from 'react';
import '../../../common/styles/styles.css'
import { useNavigate } from 'react-router-dom';
import MiniFooter from '../../../common/components/MiniFooter';

const WithdrawalDashboard: React.FC = () => {


  const navigate = useNavigate()

  const renderMessage = () => {
    const investment = localStorage.getItem('cassockInvestment')
    if (investment){
   

        return <div className='d-flex flex-column align-items-center px-3'>
          <p  className='text-center text-light' >You can not make withdrawals not until your pay out day.</p>
          <button onClick={() => navigate('/dashboard')} className='button-styles button-width-narrower text-light'>Dashboard</button>
        </div>
    }else{
        return (
          <div className='d-flex flex-column align-items-center'>
            <p className='text-center text-light'>No investment yet</p>
            <button onClick={() => navigate('/invest/managers')} className='button-styles button-width-narrow text-light'>Invest</button>
          </div>
        );
     
  };
  }
  return (
   <div className='primary-background'>
    <div className='d-flex flex-column  py-5 align-items-center full-height text-light'>
      <h2 className='mb-5'>Withdrawal</h2>
      {renderMessage()}
    </div>
<MiniFooter primaryVariant/>
    </div>
  );
}

export default WithdrawalDashboard;
