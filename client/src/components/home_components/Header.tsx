
import React from 'react';
import NavbarComponent from '../general/NavbarComponent';
import { Col, Row } from 'react-bootstrap'
import header from '../../assets/images/header.gif'
import PopupToast from './PopupToast';
import '../styles.css'
import { companyName } from '../../utils/constants';
import { GetStartedButton } from '../general/Button';
const Header: React.FC = () => {


  return (
    <div className='primary-background header pb-4 px-4'>
      <NavbarComponent />
      <PopupToast />
        <Row>
          <Col xs={12} lg={6}>
            <div className='text-light'>
              <h1 className=' heavy-font'>The best way to invest in the financial markets</h1>
              <h6 className='mid-font'>{companyName} is the safest and easiest way to make smarter investments and earn real returns. We make investing simple, accessible, and affordable.</h6>
              <div className='py-4 button-width-narrower'>
             <GetStartedButton/>
              </div>
            </div>
          </Col>
          <Col xs={12} lg={6}>
            <img className='header-image-border' src={header} alt='header' />
          </Col>
        </Row>

      </div>
   
  );
};

export default Header;
