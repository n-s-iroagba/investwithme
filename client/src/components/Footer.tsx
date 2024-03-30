import React from 'react';
import { Row, Col } from 'react-bootstrap';
import '../assets/Styles.css'
import { SocialMediaButton } from './Button';
import { companyName } from '../helpers/data';
export const miniFooter = 
<footer className='border-0 border-top border-light text-light w-100 text-center py-3 mt-5'>{companyName}</footer>

const Footer = () => {
  return (
    <footer className="background-secondary text-dark px-4 mt-4 py-4">
        <Row>
          <Col xs={12} md = {9}>
             {/* 3 columns */}
            <Row> 
              <Col md={4}>
                <h5>Services</h5>
                <ul className="list-unstyled">
                  <li>Investment Tiers</li>
                  <li>Portfolio Management</li>
                </ul>
              </Col>
              <Col md={4}>
                <h5>About Us</h5>
                <ul className="list-unstyled">
                  <li>Services</li>
                  <li>Insights</li>
                </ul>
              </Col>
              <Col md={4}>
                <h5>Legal</h5>
                <ul className="list-unstyled">
                  <li>Privacy Policy</li>
                  <li>Cookie Policy</li>
                  <li>Terms of Use</li>
                  <li>Sitemap</li>
                </ul>
              </Col>
            </Row>
          </Col>
          <Col xs={12} md= {3}>
           {/* 1 column */}
            <Row>
              <Col xs={12}>
                <Row>
                  <Col xs={3}>
                  <h5>Contact</h5>
                  <SocialMediaButton/>
                  </Col>
                </Row>
                <p className='margin-top'>+44 (0)3308 285 883</p>
                <p>hello@cassock.com</p>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
           {/* bottom */}
          <Col md={6}>
          <p className="text-md-right">
              {companyName} is a registered trademake of  {companyName} equity, a registered company in Malta
            </p>
            <p className="text-md-right">
              VAT Registration No: 386809347 | Company Registration No: 11101195.
            </p>
            <p className="text-md-right">Registered Office: 40 Caversham Road, Reading, RG1 7EB</p>
  
          </Col>
          
        </Row>
        <Row>
            <Col xs={12}>
            <p className="text-center">Copyright 2024 – Cassock</p>
            </Col>
            </Row>
      
    </footer>
  );
};

export default Footer;