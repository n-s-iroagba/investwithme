import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const DashboardNav: React.FC<{ icon: IconProp; text: String }> = (props) => {
  return (
    <div style={{ background: '#3aaf79', height: '25vw',width:'25vw' }} className="d-flex flex-column align-items-center justify-content-center">
      <FontAwesomeIcon style={{ color: 'white'}} icon={props.icon} />
      <p style={{ color: 'white', marginTop: '0.5rem' }}>{props.text}</p>
    </div>
  );
};

export default DashboardNav;
