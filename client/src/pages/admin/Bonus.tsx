import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { MiniFooter } from '../../components/home_components/Footer';
import PaymentCard from '../../components/admin/PaymentCard';

const Bonus = () => {
  const promoData = [
    {
      firstName:'adldlfj',
      lastName:'akdfal',
      walletAddress: '0x1234567890abcdef',
      amount: 100,
      currency:'ETH',
      id: 1,
    },
    {
      firstName:'adldlfj',
      lastName:'akdfal',
      walletAddress: '0x9876543210fedcba',
      amount: 200,
      currency:'ETH',
      id: 2,
    },
    {
      firstName:'adldlfj',
      lastName:'akdfal',
      walletAddress: '0x1234567890abcdef',
      amount: 100,
      currency:'ETH',
      id: 1,
    },
    {
      firstName:'adldlfj',
      lastName:'akdfal',
      walletAddress: '0x9876543210fedcba',
      amount: 200,
      currency:'ETH',
      id: 2,
    },
  
  ];

  return (
    <div className='primary-background d-flex flex-column align-items-center full-height text-light px-3'>
      <h2 className='my-3'>Pending Promo Payments</h2>
      <Row className='d-flex justify-content-center align-items-center gy-2' >
      {promoData.map((walletData) => (
        <Col xs={12} md={4} lg={3}>
        <PaymentCard key={walletData.id} {...walletData} entity='promo' />
        </Col>
      ))}
      </Row>
      <MiniFooter primaryVariant/>
    </div>
  );
};

export default Bonus;
