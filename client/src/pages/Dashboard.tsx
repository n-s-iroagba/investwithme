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



  const icons = [faHandHoldingDollar,faMoneyBillTrendUp,faBars]
  const actions = ['investment-guide','investment-guide','investment-guide']
  const texts =  ['how to invest','how to invest','how to invest',]
return <div className='dashboard-wrapper'>
  
    <DashboardBar />

    <Container className=''>
      <Row className="d-flex flex-wrap justify-content-center">
      {texts.map((text,index)=>{

        return  <Col xs={4}  lg={4} className="mb-3">
         <DashboardNav  action={()=>navigate('/'+actions[index])} text={text} icon={icons[index]} />
        </Col>
        
      }
      )}
      </Row>
    </Container>
  </div>
}
export default Dashboard