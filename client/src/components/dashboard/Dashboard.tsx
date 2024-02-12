import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import DashboardNav from '../DashboardNav/DashboardNav'
import { faBars, faBell, faMoneyBillTrendUp } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const GradientDiv = styled.div`
  width: 100%;
  padding:5vw;
  background: linear-gradient(to bottom right,#1a6e41, #79b294);

`;


const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.div`
  margin-right: 5vw;
`;
// <{greeting:string,username:string}>
const DashboardBar: React.FC = () => {
  return (
    <Row>
      <Col xs={6}>
        <h5>Good Afternoon,</h5>
        <h6>Wakkias</h6>
      </Col>

      <Col xs={6} className="d-flex justify-content-end align-items-center">
        <LogoContainer>
          <Logo>logo</Logo>
          <FontAwesomeIcon icon={faBell} />
        </LogoContainer>
      </Col>
    </Row>
  );
};




const Dashboard: React.FC = () => {

  return <div>
    <GradientDiv>
      <DashboardBar />

      <Container className=''>
        <Row className="d-flex flex-wrap justify-content-center g-4">

          <Col xs={4}  lg={4} className="mb-3">
            <div className="g-4"><DashboardNav text='invest' icon={faBars} /></div>
          </Col>
          <Col  xs={4}  lg={3} className="mb-3">
            <div className="g-4"><DashboardNav text='invest' icon={faMoneyBillTrendUp} /></div>
          </Col>
          <Col xs={4}  lg={3} className="mb-3">
            <div className="flex-item"><DashboardNav text='invest' icon={faBars} /></div>
          </Col>
          <Col  xs={4}  lg={3} className="mb-3">
            <div className="flex-item"><DashboardNav text='invest' icon={faBars} /></div>
          </Col>
          <Col  xs={4}  lg={3} className="mb-3">
            <div className="flex-item"><DashboardNav text='invest' icon={faBars} /></div>
          </Col>
          <Col  xs={4}  lg={3} className="mb-3">
            <div className="flex-item"><DashboardNav text='invest' icon={faBars} /></div>
          </Col>



        </Row>
      </Container>
    </GradientDiv>
  </div>

}
export default Dashboard