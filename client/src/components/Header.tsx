
import React from 'react';
import NavbarComponent from './NavbarComponent';
import {Col,Container,Row} from 'react-bootstrap'
import Button from './Button'
import header from '../assets/home0.gif'
import { faSackDollar } from '@fortawesome/free-solid-svg-icons';
import PopupToast from './PopupToast';
import'../assets/Styles.css'
const Header: React.FC = () => {

  return (
    <div className='header'>
    <NavbarComponent/>
    <PopupToast/>
    <div className=' g-outer-paddings-side'>
       <Container className=''>
        <Row>
          <Col xs={12} lg={6}>
            <div>
              <h5 style={{padding:'0'}}className='text-light header-main-text'>The best way to invest in the financial markets</h5>
              <p  className='text-light header-sub-text g-shallow-margin-bottom'>Cassock is the easiest way to make smarter investments and earn real returns. We make investing simple, accessible, and affordable.</p>
              <div className='g-shallow-margins-vertical g-shallow-margin-bottom'>
               <Button text='Become an investor'  icon={faSackDollar} />   
              </div>
            </div>
          </Col>
          <Col xs={12} lg={6}>
            <img className='header-image-border'src={header} alt='header' /> 
          </Col>
        </Row>
      </Container>
    </div>
    </div>
  );
};

export default Header;
