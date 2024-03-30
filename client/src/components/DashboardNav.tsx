import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import '../assets/Styles.css';
import { Col, Row } from 'react-bootstrap';
import { faBell } from '@fortawesome/free-solid-svg-icons';

export const DashboardBar: React.FC<{username:string,newNotification:boolean}> = (props) => {
  return (
    <Row className="d-flex text-light align-items-center w-100">
      <Col className='text-light mb-3' xs={4}>
        <h6 className='mb-0'>Good Afternoon,</h6>
        <h6 className='text-wrap'>{props.username}</h6>
      </Col>

      <Col xs={4} className="d-flex justify-content-start align-items-center mb-3">
     Logo.....
      </Col>

      <Col xs={4} className="d-flex justify-content-center align-items-center mb-3">
  
      {props.newNotification? <div className=' d-flex justify-content-center'><FontAwesomeIcon className='h-100' icon={faBell} beatFade/><div className='rounded-circle bg-danger px-1 py-1'>+{1}</div></div>: <FontAwesomeIcon icon={faBell} />}
    
      </Col>
     <Col xs={4}>
     <h6>Account Balance:</h6>
  
     </Col>
     <Col  xs={4}>
    
     <h6>$ 5,000</h6>
</Col>
    </Row>
  );
};
const DashboardNav: React.FC<{ icon: IconProp; text: string; action: () => void }> = (props) => {
  return (
    <div onClick={props.action} className="dash-nav" >
      <FontAwesomeIcon className="nav-icon" icon={props.icon} />
      <p className="dashbutton-text text-wrap">{props.text}</p>
    </div>
  );
};

export default DashboardNav;
