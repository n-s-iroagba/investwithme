
import React from 'react';
import { Col, Row } from 'react-bootstrap';

const Deposit: React.FC<{amount:number,date:string}> = ({amount,date}) => {
  return (
    <Row className = 'mx-2 border transaction border-white mb-2'>
    <Col xs={6} className='py-4'>{amount}</Col>
    <Col xs={6} className=' py-4'>{date}</Col>
  </Row>
  );
}

export default Deposit;

        
