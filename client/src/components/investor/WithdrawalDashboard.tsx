
import React, { useEffect, useState } from 'react';
import '../styles.css'
import { useNavigate } from 'react-router-dom';
import { getInvestmentStatus } from '../../utils/helpers';

const WithdrawalDashboard: React.FC = () => {
const [status, setStatus] = useState<any>({})

  const navigate = useNavigate()

  useEffect(() => {
    const fetchInvestmentStatus = async () => {
      try {
        const investmentData = await getInvestmentStatus('1');
        console.log(investmentData)// Wait for the data to be fetched
        setStatus(investmentData);
      } catch (error) {
        console.error(error);
        alert('an error occured, try again later')
        navigate ('/admin/dashboard')
      }
    };

    fetchInvestmentStatus(); // Call the async function to fetch data
  }, [navigate]);
  const renderMessage = () => {
    switch (status.status) {
      case 'notDue':

        return <div className='d-flex flex-column align-items-center px-3'>
          <p  className='text-center text-light' >You can not make withdrawals not until your pay out day.</p>
          <p className='text-center text-light'>Your payout day is {status.date}.</p>
          <button onClick={() => navigate('/dashboard')} className='button-styles button-width-narrower'>Dashboard</button>
        </div>
      case 'notInvested':
        return (
          <div className='d-flex flex-column align-items-center'>
            <p className='text-center text-light'>No investment yet</p>
            <button onClick={() => navigate('/invest/managers')} className='button-styles button-width-narrow'>Invest</button>
          </div>
        );
      case 'due':
        return <button className='button-styles button-width-narrower'  onClick={handleWithdraw}>Withdraw</button>;
      default:
        return null;
    }
  };

  const handleWithdraw = () => {
    console.log('Withdrawing...');
  };

  return (

    <div className='d-flex flex-column  py-5 align-items-center primary-background full-height text-light'>
      <h2 className='mb-5'>Withdrawal</h2>
      {renderMessage()}
    </div>
  );
}

export default WithdrawalDashboard;
