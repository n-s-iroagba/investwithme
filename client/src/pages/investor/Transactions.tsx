import React from 'react'
import TransactionComponent from '../../components/investor/TransactionComponent';
import Information from '../../components/general/Information';
import { faMoneyBillTransfer } from '@fortawesome/free-solid-svg-icons';
import { TransactionType } from '../../utils/types';


const Transactions: React.FC = () => {
  const transactions: TransactionType[] = [
    {
      id: 1,
      amount: 100,
      type: 'Credit',
      participantAccount: 'John Doe',
      narration: 'Investment Deposit',
      date: '2024-04-15',
    },
    {
      id: 2,
      amount: 5000,
      type: 'Debit',
      participantAccount: 'Jane Smith',
      narration: 'Promo bonus imbursement',
      date: '2024-04-16',
    },
    {
      id: 3,
      amount: 75,
      type: 'Credit',
      participantAccount: 'Alice Johnson',
      narration: 'Referral bonus imbursement',
      date: '2024-04-17',
    },
  ];
  
  
    return  <div className='pt-5 px-3'>
   <Information text='' head='Transactions' icon={faMoneyBillTransfer} />
    <div className='primary-background text-light rounded-top px-1 py-5 rounded-bottom'>
     {
     transactions.map((transaction:any) =>(
        <TransactionComponent transaction={transaction} key={transaction.id}/>
      ))
  } 
    </div>
    </div>
  }
  export default Transactions; 