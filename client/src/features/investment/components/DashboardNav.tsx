import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import '../../../common/styles/styles.css'
import { Col, Row } from 'react-bootstrap';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import logoImage from '../../../assets/logo/whitelogo.png'


import { useNavigate } from 'react-router-dom';
import { getGreeting } from '../utils/utils';
import Logo from '../../../common/components/Logo';

export const DashboardBar: React.FC<{ username: string, numberOfNewNotifications: number }> = (props) => {
  const navigate = useNavigate();
  return (
    <Row className="text-light w-100 d-flex align-items-center justify-content-between">

      <Col>
        <small className='smallest-font'>{getGreeting() + ','}</small>
        <h3 className='text-wrap'>{props.username}</h3>
      </Col >

      <Col className='d-flex justify-content-center' >  <Logo logoImage={logoImage} /></Col>

      <Col className="d-flex justify-content-end align-items-center">
        <FontAwesomeIcon className='icon' onClick={() => navigate('/notifications')} icon={faBell} />
        {
          props.numberOfNewNotifications > 0 &&
          <small className='rounded-circle dash-nav text-center'>+{props.numberOfNewNotifications}</small>

        }
      </Col>
    </Row>
  );
};


export const AdminDashboardBar: React.FC<{ username: string }> = (props) => {
  return (
    <Row className="d-flex text-light align-items-center w-100">
      <Col className='text-light mb-2' xs={12} md={6}>
        <h6 className='mb-2'>{getGreeting() + ','}</h6>
        <h6 className='text-wrap'>{props.username}</h6>
      </Col>
    </Row>
  );
};


const DashboardNav: React.FC<{ notifIcon?: IconProp, icon: IconProp; text: string; action: () => void }> = (props) => {
  return (
    <div>
      <div onClick={props.action} className="w-100 admin-dash-nav" >
        <FontAwesomeIcon className="nav-icon" icon={props.icon} />
        <p className="dashbutton-text mt-1 text-wrap">{props.text}</p>
      </div>
    </div>
  );
};

export default DashboardNav;
