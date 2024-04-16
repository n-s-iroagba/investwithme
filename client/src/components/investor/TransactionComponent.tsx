import React from 'react';
import { Col,Row } from 'react-bootstrap';
import { TransactionType } from '../../utils/types';
import { numberWithCommas } from '../../utils/utils';


const TransactionComponent: React.FC<{transaction:TransactionType}> = ({ transaction }) => {
  const formattedAmount = numberWithCommas(transaction.amount)
  const truncatedAmount = formattedAmount.length > 5 ? formattedAmount.slice(0, 5) + '...' : formattedAmount;
  return (
    <div className = 'mx-2 border transaction border-white px-2 py-2 mb-2'>
          <Row >
            <Col xs={3} className=''>
              {transaction.type}
             
            </Col>
            <Col xs={3} className='text-center'>{transaction.type==='Credit'?'From':'To'}</Col>
            <Col xs={3} className=''>{transaction.participantAccount}</Col>
          <Col xs={3}  className={transaction.type === 'Debit' ? 'text-danger  ' : ' ' }>
              <div>{transaction.type === 'Debit'? `-${truncatedAmount}` : `+${truncatedAmount}`}</div>
              
            </Col>
          </Row>
          <div className='d-flex transaction-small justify-content-between'>
          <div><small>{transaction.narration}</small></div>
          <div><small className='text-light'>{transaction.date}</small></div>
          </div>
          </div>
  );
};

export default TransactionComponent;