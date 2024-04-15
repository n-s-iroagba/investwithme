import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import '../styles.css'
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const WithdrawalDashboard: React.FC = () => {

const navigate = useNavigate()

  const status:string = 'investedButNotDue'

  const renderMessage = () => {
    switch (status) {
      case 'investedButNotDue':

        return <div className='d-flex flex-column align-items-center'>
         <p>You can not make withdrawals not until your pay out day</p>
         <p>Your payout day is xxxx</p>
        <button  onClick= {()=>navigate('/dashboard')}className='button-styles button-width-narrower'><div>Dashboard</div><div ></div></button>
        </div> 
      case 'notYetInvested':
        return (
          <div className='d-flex flex-column align-items-center'>
            <p>No investment yet</p>
            <button  onClick= {()=>navigate('/invest/managers')}className='button-styles button-width-narrower'><div>Invest</div><div ><FontAwesomeIcon icon={faDollarSign} beatFade/></div></button>
          </div>
        );
      case 'dueForWithdrawal':
        return <button onClick={handleWithdraw}>Withdraw</button>;
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
