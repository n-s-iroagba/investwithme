import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import DashboardNav from '../components/DashboardNav'
import { faBars, faBell, faMoneyBillTrendUp,faHandHoldingDollar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../assets/Styles.css'
// <{greeting:string,username:string}>
const DashboardBar: React.FC = () => {
  return (
    <Row>
      <Col xs={6}>
        <h5>Good Afternoon,</h5>
        <h6>Wakkias</h6>
      </Col>

      <Col xs={6} className="d-flex justify-content-end align-items-center">
        <div className='logo-container'>
          <div className='logo'>logo</div>
          <FontAwesomeIcon icon={faBell} />
        </div >
      </Col>
    </Row>
  );
};

// #1a6e41;
//   --secondary-color: #79b294


const Dashboard: React.FC = () => {
  const navigate = useNavigate();



  return <div className='dashboard-wrapper'>
    
      <DashboardBar />

      <Container className=''>
        <Row className="d-flex flex-wrap justify-content-center g-4">

          <Col xs={4}  lg={4} className="mb-3">
            <div onClick={()=>navigate('/investment-guide')} className="g-4"><DashboardNav text='How to invest' icon={faHandHoldingDollar} /></div>
          </Col>
          <Col  xs={4}  lg={3} className="mb-3">
            <div onClick={()=>navigate('/invest')} className="g-4"><DashboardNav text='Invest' icon={faMoneyBillTrendUp} /></div>
          </Col>
          <Col xs={4}  lg={3} className="mb-3">
            <div className="flex-item"><DashboardNav text='Transaction History' icon={faBars} /></div>
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
    </div>
}
export default Dashboard