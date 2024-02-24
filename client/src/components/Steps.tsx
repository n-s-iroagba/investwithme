import React from 'react';
import { faUser, faWallet, faBank } from '@fortawesome/free-solid-svg-icons';
import Information from './Information';
import { Col, Container, Row } from 'react-bootstrap';
import home1 from '../assets/home1.webp'
import '../assets/Styles.css'
import { GetStartedButton } from './Button';

const Steps: React.FC = () => {

  return (
    <div className='px-4 py-4'>
      <div className='d-flex flex-column align-items-center'>
        <h2 className='text-center '>Unlock your</h2>
        <h2 className='text-center '>financial freedom</h2>
        <div className='primary-line'></div>
      </div>
      <Row>
        <Col sm={12} lg={6}>
          <img style={{width:'100%'}}src={home1} alt='home1' />
        </Col>
        <Col sm={12} lg={6}>

          <p className='shallow-top-padding'>Attaining financial freedom has never been so easy. Get started in 3 easy steps:</p>
          <Row>
            <Col lg={4}>
              <Information head='Create an account' text='by filling in the sign-up form and verifying your phone number via SMS or email' icon={faUser} />
            </Col>
            <Col lg={4}>
              <Information head='Fund your wallet' text='via multiple crypto exchanges including Coinbase etc.' icon={faWallet} />
            </Col>
            <Col lg={4}>
              <Information head='Start Investing' text='by selecting a dedicated fund manager to oversee your account' icon={faBank} />
            </Col>
          </Row>
        </Col>
      </Row>
      <Container>
        <Row className='d-flex justify-content-center align-items-center'>
          <div className=' button-width-narrow'>
            <GetStartedButton />
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default Steps;

