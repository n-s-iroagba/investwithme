import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer: React.FC = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col lg={4}>
            <p>Copyright © 2023 My Company. All rights reserved.</p>
          </Col>
          <Col lg={4}>
            <ul className="list-unstyled">
              <li>Terms of Use</li>
              <li>Privacy Policy</li>
              <li>Contact Us</li>
            </ul>
          </Col>
          <Col lg={4}>
            <ul className="list-unstyled">
              <li>Facebook</li>
              <li>Twitter</li>
              <li>Instagram</li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;