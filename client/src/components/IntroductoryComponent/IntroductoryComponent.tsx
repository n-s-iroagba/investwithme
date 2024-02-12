import React, { useEffect, useState, useRef } from 'react';
import { faUser, faWallet, faBank } from '@fortawesome/free-solid-svg-icons';
import Information from '../information/Information';
import { Col, Container, Row } from 'react-bootstrap';
import * as styles from '../styles';
import home1 from '../home1.webp'
import './IntroductoryComponent.css'
import { GetStartedButton } from '../button/Button';

const IntroductoryComponent: React.FC = () => {
  const [clientCount, setClientCount] = useState(0);
  const [assetCount, setAssetCount] = useState(0);
  const [isComponentVisible, setIsComponentVisible] = useState(false);
  const componentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsComponentVisible(true);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Change this threshold as needed
      }
    );

    if (componentRef.current) {
      observer.observe(componentRef.current);
    }

    return () => {
      if (componentRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(componentRef.current);
      }
    };
  }, []);

  useEffect(() => {
    let clientIntervalId: NodeJS.Timeout;
    let assetIntervalId: NodeJS.Timeout;

    if (isComponentVisible) {
      clientIntervalId = setInterval(() => {
        setClientCount(prevCounter => (prevCounter < 500000 ? prevCounter + 100000 : prevCounter));
      }, 0.5);

      assetIntervalId = setInterval(() => {
        setAssetCount(prevCounter => (prevCounter < 300000000 ? prevCounter + 1000000 : prevCounter));
      }, 0.1);
    }

    return () => {
      clearInterval(clientIntervalId);
      clearInterval(assetIntervalId);
    };
  }, [isComponentVisible]);

  return (
    <div ref={componentRef} style={styles.outerHorizontalPaddingStyles}>
      <Row style={{backgroundColor:' #79b294',}}>
        <Col className='element some-padding' sm={12} lg={6}>
          <h2 style={{textAlign:'center',fontWeight:'900',}}> {clientCount}+</h2><h3 style={{textAlign:'center'}}>investors worldwide</h3>
        </Col>
        <Col  className=' some-padding'sm={12} lg={6}>
          <h2 style={{textAlign:'center',fontWeight:'900'}}>${assetCount}+</h2><h3 style={{textAlign:'center'}}> under our management</h3>
        </Col>
      </Row>
      <Row>
        <Col sm={12} lg={6}>
          <img style={{width:'100%'}} src={home1} alt='home1'/>
        </Col>
        <Col sm={12} lg={6}>
      
  <h2 style={{textAlign:'center',paddingLeft:'0',marginLeft:'0',paddingTop:'1cm',fontWeight:'950'}}>Unlock your</h2>
  <h2 style={{textAlign:'center',paddingLeft:'0',marginLeft:'0',fontWeight:'950'}}>financial freedom</h2>  
    <p style={{paddingTop:'0.5cm'}}>Attaining financial freedom has never been so easy. Get started in 3 easy steps:</p>
       
  
          <Row>
            <Col lg={4}>
              <Information head='Create an account' text='by filling in the sign-up form and verifying your phone number via SMS or email' icon ={faUser}/>
            </Col>
            <Col lg={4}>
              <Information  head='Fund your wallet' text='via multiple crypto exchanges including Coinbase etc.' icon ={faWallet}/>
            </Col>
            <Col lg={4}>
              <Information  head='Start Investing' text='by selecting a dedicated fund manager to oversee your account' icon ={faBank}/>
            </Col>
          </Row>
        </Col>
      </Row>
      <Container>
        <Row className="justify-content-center">
        <GetStartedButton/>
        </Row>
      </Container>
    </div>
  );
};

export default IntroductoryComponent;

