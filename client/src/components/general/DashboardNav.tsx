import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import '../styles.css';
import { Col, Row } from 'react-bootstrap';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { getGreeting } from '../../utils/utils';
import { numberWithCommas } from '../../utils/utils';
import { useNavigate } from 'react-router-dom';

export const DashboardBar: React.FC<{ username: string, numberOfNewNotifications: number, deposit: number,earnings:number }> = (props) => {
  const navigate = useNavigate();
  return (
    <Row className="d-flex text-light align-items-center w-100">
      <Col className='text-light' xs={9}>
        <h6 className=''>{getGreeting() + ','}</h6>
        <h6 className='text-wrap'>{props.username}</h6>
      </Col>
      <Col xs={3} className="d-flex justify-content-center align-items-center mb-3">
        {props.numberOfNewNotifications>0 ? <div className=' d-flex justify-content-center'><FontAwesomeIcon className='h-100' onClick={()=>navigate('/notifications')} icon={faBell} beatFade /><div className='rounded-circle bg-danger px-1 py-1'>+{props.numberOfNewNotifications}</div></div> : <FontAwesomeIcon icon={faBell} beat/>}
      </Col>
      <Col xs={8}>
        <small>*Amount Invested: ${numberWithCommas(props.deposit)}</small>
      </Col>
      <Col xs={8}>
        <small>*Earnings: ${numberWithCommas(props.earnings)}</small>
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
      <div onClick={props.action} className="w-100 dash-nav" >
        {props.notifIcon &&
          <FontAwesomeIcon className='notification text-danger' icon={props.notifIcon} beat/>
        }
        <FontAwesomeIcon className="nav-icon" icon={props.icon} />
        <p className="dashbutton-text text-wrap">{props.text}</p>
      </div>
    </div>
  );
};

export default DashboardNav;
