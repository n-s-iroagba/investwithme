import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Information from './Information';
import Button from './Button';
import security from '../assets/security.webp';
import { faBank } from '@fortawesome/free-solid-svg-icons';

const SecurityAssurance: React.FC = () => {
  return (
    <Container>
      <Row className="flex-column-reverse flex-lg-row">
        {/* Image column */}
        <Col sm={12} lg={6} className="order-lg-2">
          <img style={{ width: '100%' }} src={security} alt='home1' />
        </Col>
        {/* Text and Information columns */}
        <Col sm={12} lg={6} className="order-lg-1">
          <h2 className='text-center heavy-font'>Your money is safe</h2>
          <h2 className='text-center heavy-font'>with us</h2>
          <p>You trust us with your investments and we take that very seriously. We are committed to protecting your money and information with the highest standards of security available.</p>
          <Row>
            <Col lg={4}>
              <Information head='Bank level security' text="
            We use state-of-the-art data encryption when handling your financial information and two-factor authentication (2FA) protection. 
             We're backed by top financial market operators and we not only meet traditional banking security standards, we exceed them" icon={faBank} />
            </Col>
            <Col lg={4}>
              <Information head="Secure payments" text="Our payment processor is PADSS & PCIDSS compliant satisfying the highest level of Security Audit available." icon={faBank} />
            </Col>
            </Row>
            <Row>
            <Col lg={4}>
              <Information head='Covered by US SEC' text="Trading accounts are held by our partners, a firm duly registered by the Securities and Exchange Commission  in the US" icon={faBank} />
            </Col>
            <Col lg={4}>
              <Information head='Covered by US SEC' text="Trading accounts are held by our partners, a firm duly registered by the Securities and Exchange Commission  in the US" icon={faBank} />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Button text='Invest' icon={'a'} />
      </Row>
    </Container>
  );
};

export default SecurityAssurance;
