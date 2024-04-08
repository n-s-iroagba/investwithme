import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import '../styles.css'
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const WithdrawalDashboard: React.FC = () => {

const navigate = useNavigate()

  const status:string = 'notYetInvested'

  const renderMessage = () => {
    switch (status) {
      case 'investedButNotDue':
        return  <p>You can not make withdrawals not until your pay out day</p>
      case 'notYetInvested':
        return (
          <div>
            <p>No investment yet</p>
            <button  onClick= {()=>navigate('/invest/managers')}className='button-styles'><div>Invest</div><div ><FontAwesomeIcon icon={faDollarSign} beatFade/></div></button>
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
    <div>
      <h2>Withdrawal</h2>
      {renderMessage()}
    </div>
  );
}

export default WithdrawalDashboard;
