import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import '../styles.css';
import { Col, Row } from 'react-bootstrap';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { getGreeting } from '../../utils/utils';
import { numberWithCommas } from '../../utils/utils';

export const DashboardBar: React.FC<{ username: string, newNotification: boolean, balance: number }> = (props) => {
  return (
    <Row className="d-flex text-light align-items-center w-100">
      <Col className='text-light' xs={9}>
        <h6 className=''>{getGreeting() + ','}</h6>
        <h6 className='text-wrap'>{props.username}</h6>
      </Col>
      <Col xs={3} className="d-flex justify-content-center align-items-center mb-3">
        {props.newNotification ? <div className=' d-flex justify-content-center'><FontAwesomeIcon className='h-100' icon={faBell} beatFade /><div className='rounded-circle bg-danger px-1 py-1'>+{1}</div></div> : <FontAwesomeIcon icon={faBell} />}
      </Col>
      <Col xs={8}>
        <small>*Balance: {numberWithCommas(props.balance)}</small>
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
      <div onClick={props.action} className="dash-nav" >
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
