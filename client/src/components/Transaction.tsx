import React from 'react';
import { Col,Row } from 'react-bootstrap';


interface Transaction {
  id: number;
  description: string;
  amount: number;
  origin:string,
  type: 'Credit' | 'Debit'; 
}

const TransactionComponent: React.FC<{transaction:Transaction}> = ({ transaction }) => {
  return (
          <Row className = 'mx-2 border transaction border-white px-2 mb-2'>
            <Col xs={3} className='d-flex align-items-center py-4'>{transaction.type}</Col>
            <Col xs={3} className='d-flex align-items-center py-4 text-center'>{transaction.type==='Credit'?'From':'To'}</Col>
            <Col xs={4} className=' py-4'>{transaction.origin}</Col>
          <Col xs={2}  className={transaction.type === 'Debit' ? 'text-danger py-4 px-1 d-flex align-items-center' : ' py-4 px-1 d-flex align-items-center' }>
              {transaction.type === 'Debit'? `-${transaction.amount}` : `+${transaction.amount}`}
            </Col>
          </Row>
  );
};
export default TransactionComponent

  