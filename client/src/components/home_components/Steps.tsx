import React from 'react';
import { faUser, faWallet, faBank } from '@fortawesome/free-solid-svg-icons';
import Information from '../general/Information';
import { Col, Row } from 'react-bootstrap';
import moneyBag from '../../assets/images/moneyBag.webp'
import '../styles.css'
import { GetStartedButton } from '../general/Button';

const Steps: React.FC = () => {

  return (
    <div className='px-4 py-4'>
      <div className='mb-4 d-flex flex-column align-items-center'>
        <h2 className='text-center '>Unlock your</h2>
        <h2 className='text-center '>financial freedom</h2>
        <div className='primary-line'></div>
      </div>
      <Row>
        <Col sm={12} lg={6}>
          <img className='w-100'src={moneyBag} alt='money_bag' />
        </Col>
        <Col sm={12} lg={6}>

          <p>Attaining financial freedom has never been so easy. Get started in 3 easy steps:</p>
          <Row>
            <Col lg={4}>
              <Information head='Create an account' text='by filling in the sign-up form and verifying your email.' icon={faUser}/>
            </Col>
            <Col lg={4}>
              <Information head='Start Investing' text='by selecting a dedicated fund manager to oversee your account.' icon={faBank}/>
            </Col>
            <Col lg={4}>
              <Information head='Fund your account' text='via multiple crypto exchanges including Coinbase etc.' icon={faWallet} />
            </Col>
            
          </Row>
        </Col>
      </Row>
      <div>
        <Row className='mt-0 d-flex justify-content-center align-items-center'>
          <div className=' button-width-narrow'>
            <GetStartedButton />
          </div>
        </Row>
      </div>
    </div>
  );
};

export default Steps;

