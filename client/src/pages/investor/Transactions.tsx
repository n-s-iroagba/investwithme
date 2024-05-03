import React, { useEffect, useState } from 'react'
import TransactionComponent from '../../components/investor/TransactionComponent';
import Information from '../../components/general/Information';
import { faMoneyBillTransfer } from '@fortawesome/free-solid-svg-icons';
import { TransactionType } from '../../utils/types';
import { getTransaction } from '../../utils/helpers';
import { useNavigate } from 'react-router-dom';


const Transactions: React.FC = () => {
  const [transactions, setTransactions] = useState<TransactionType[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchManagerData = async () => {
      try {
        const transactionData = await getTransaction(1);
        setTransactions(transactionData);
      } catch (error) {
        console.error(error);
        alert('an error occured, try again later')
        navigate('/dashboard')
      }
    };
    fetchManagerData();
  }, [navigate]);


  return <div className='pt-5 px-3'>
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
</div>

}
export default Transactions; 