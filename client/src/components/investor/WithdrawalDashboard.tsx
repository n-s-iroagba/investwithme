import React from 'react';

interface WithdrawalStatusProps {
  getWithdrawalStatus: () => 'investedButNotDue' | 'notYetInvested' | 'dueForWithdrawal';
}

const WithdrawalDashboard: React.FC<WithdrawalStatusProps> = ({ getWithdrawalStatus }) => {
  const status = getWithdrawalStatus();

  const renderMessage = () => {
    switch (status) {
      case 'investedButNotDue':
        return <p>Invested</p>;
      case 'notYetInvested':
        return (
          <div>
            <p>No investment yet</p>
            <button onClick={handleInvest}>Invest</button>
          </div>
        );
      case 'dueForWithdrawal':
        return <button onClick={handleWithdraw}>Withdraw</button>;
      default:
        return null;
    }
  };

  const handleInvest = () => {
    // Logic for handling investment
    console.log('Investing...');
  };

  const handleWithdraw = () => {
    // Logic for handling withdrawal
    console.log('Withdrawing...');
  };

  return (
    <div>
      <h2>Withdrawal Status</h2>
      {renderMessage()}
    </div>
  );
}

export default WithdrawalDashboard;
