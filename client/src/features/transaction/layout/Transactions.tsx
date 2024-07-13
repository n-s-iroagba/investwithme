import React, { useEffect, useState } from 'react'
import TransactionComponent from '../components/TransactionComponent';
import { TransactionDto } from '../../../../../common/transactionType';


const Transactions: React.FC = () => {
  const [transactions, setTransactions] = useState<TransactionDto[]>([])
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 5;


  useEffect(() => {
    const fetchTransactions = async () => {
      try {
    
        const storedTransactions = localStorage.getItem('cassockTransactions');
        console.log(storedTransactions)
        const transacts: TransactionDto[] = storedTransactions ? JSON.parse(storedTransactions) : [];
        setTransactions(transacts);
      } catch (error) {
        console.error('Error loading transactions from localStorage:', error);
      }
    };

    fetchTransactions();
  }, []); 

  const handleNext = () => {
    if (currentIndex + itemsPerPage < transactions.length) {
      setCurrentIndex(currentIndex + itemsPerPage);
    }
  };

  const handlePrevious = () => {
    if (currentIndex - itemsPerPage >= 0) {
      setCurrentIndex(currentIndex - itemsPerPage);
    }
  };
  const displayedItems = transactions.slice(currentIndex, currentIndex + itemsPerPage);

  return<>
  <div className='px-3 mt-2'>

  <div className='primary-background text-light round-top px-1 py-5'>
  <h4 className='mb-3 text-center transaction-header'>Transactions</h4>
    {transactions.length === 0 || !transactions ? (
      <h5 className='text-center'>No Transactions yet.</h5>
    ) : (
      displayedItems.map((transaction,) => (
        <TransactionComponent transaction={transaction} key={transaction.id} />
      )
      ))
    }
    <div className="navigation">
        {currentIndex > 0 && (
          <button onClick={handlePrevious}>&larr; Previous</button>
        )}
        <span>{`${currentIndex + 1} - ${Math.min(currentIndex + itemsPerPage, transactions.length)} of ${transactions.length}`}</span>
        {currentIndex + itemsPerPage < transactions.length && (
          <button onClick={handleNext}>Next &rarr;</button>
        )}
      </div>
  </div>
</div>

</> 

}
export default Transactions; 


