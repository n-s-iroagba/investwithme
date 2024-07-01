import React, { useEffect, useState } from 'react'
import TransactionComponent from '../../components/investor/TransactionComponent';
import Information from '../../components/general/Information';
import { faMoneyBillTransfer } from '@fortawesome/free-solid-svg-icons';
import { TransactionType } from '../../utils/types';
import { useNavigate } from 'react-router-dom';
import { MiniFooter } from '../../components/home_components/Footer';


const Transactions: React.FC = () => {
  const [transactions, setTransactions] = useState<TransactionType[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
    
        const storedTransactions = localStorage.getItem('cassockTransactions');
        console.log(storedTransactions)
        const transacts: TransactionType[] = storedTransactions ? JSON.parse(storedTransactions) : [];
        setTransactions(transacts);
      } catch (error) {
        console.error('Error loading transactions from localStorage:', error);
      }
    };

    fetchTransactions();
  }, []); 

  return<>
  <div className='pt-5 px-3'>
  <Information text='' head='Transactions' icon={faMoneyBillTransfer} />
  <div className='primary-background text-light rounded-top px-1 py-5 rounded-bottom'>
    {transactions.length === 0 || !transactions ? (
      <h5 className='text-center'>No Transactions yet.</h5>
    ) : (
      transactions.map((transaction) => (
        <TransactionComponent transaction={transaction} key={transaction.id} />
      ))
    )}
  </div>
  <div className='d-flex justify-content-center'>
  <button className='mt-3 button-styles button-width-narrow ' onClick={()=>navigate('/dashboard')}>Dashboard</button>
  </div>
</div>
<MiniFooter/>
</> 

}
export default Transactions; 


