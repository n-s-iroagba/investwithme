
import React from 'react';
import NavbarComponent from './NavbarComponent';
import { Col, Row } from 'react-bootstrap'
import { GetStartedButton } from './Button'
import header from '../assets/home0.gif'
import PopupToast from './PopupToast';
import '../assets/Styles.css'
import { companyName } from '../helpers/data';
const Header: React.FC = () => {

  return (
    <div className='primary-background header pb-4 px-4'>
      <NavbarComponent />
      <PopupToast />
        <Row>
          <Col xs={12} lg={6}>
            <div className='text-light'>
              <h1 className=' heavy-font'>The best way to invest in the financial markets</h1>
              <h6 className='mid-font'>{companyName} is the and safest and easiest way to make smarter investments and earn real returns. We make investing simple, accessible, and affordable.</h6>
              <div className='py-4 button-width-narrow'>
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
