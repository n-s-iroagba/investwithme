import React from 'react'
import TransactionComponent from '../../components/Transaction';
import Information from '../../components/Information';
import { faMoneyBillTransfer } from '@fortawesome/free-solid-svg-icons';


const Transactions: React.FC = () => {
    const transactions:any = [
      {
        id: 1,
        description: 'Salary',
        amount: 5000,
        origin: 'Cassock',
        type: 'Credit',
      },
      {
        id: 2,
        description: 'Rent payment',
        amount: 1000,
        origin: 'Your Wallet',
        type: 'Credit',
      },
      {
        id: 3,
        description: 'Online purchase',
        amount: 200,
        origin: 'Online Store',
        type: 'Debit',
      },
    ];
  
    return  <div className='pt-5 px-3'>
   <Information text='' head='Transactions' icon={faMoneyBillTransfer} />
    <div className='primary-background text-light rounded-top px-3 py-5 rounded-bottom'>
     {
     transactions.map((transaction:any) =>(
        <TransactionComponent transaction={transaction} key={transaction.id}/>
      ))
  } 
    </div>
    </div>
  }
  export default Transactions; 