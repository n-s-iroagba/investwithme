import React from 'react';
import { Col,Row } from 'react-bootstrap';
import { formatStartDate } from '../../investment/utils/utils';
import { numberWithCommas } from '../../../common/utils/utils';
import {TransactionDto} from '../../../../../common/transactionType'


const TransactionComponent: React.FC<{transaction:TransactionDto}> = ({ transaction }) => {
  const transactionDate = new Date(transaction.date);
  const isoDateString = transactionDate.toISOString();

  const formattedAmount = numberWithCommas(transaction.amount)
  const truncatedAmount = formattedAmount.length > 5 ? formattedAmount.slice(0, 5) + '...' : formattedAmount;
  return (
    <div className = 'mx-2 border transaction border-white px-2 py-2 mb-2'>
          <Row >
            <Col xs={3} className=''>
              {transaction.type}
             
            </Col>
            <Col xs={3} className='text-center'>{transaction.type==='Credit'?'From':'To'}</Col>
            <Col xs={3} className=''><small>{transaction.participatingAccount}</small></Col>
          <Col xs={3}  className={transaction.type === 'Debit' ? 'text-danger  ' : ' ' }>
              <div>{transaction.type === 'Debit'? `-${truncatedAmount}` : `+${truncatedAmount}`}</div>
              
            </Col>
          </Row>
          <Row className='d-flex transaction-small'>
            
          <Col xs={9}><small>*{transaction.narration}</small></Col>
           
          <Col><small className='text-light'>{formatStartDate(isoDateString)}</small></Col>
          
          </Row>
          </div>
  );
};

export default TransactionComponent;