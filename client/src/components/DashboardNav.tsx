import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const DashboardNav: React.FC<{ icon: IconProp; text: String }> = (props) => {
  
  // #1a6e41;
  // --secondary-color: #79b294
  return (
    <div style={{ background: 'linear-gradient(to bottom right,#1a6e41, #79b294)', height: '25vw', width: '25vw' }} className="d-flex flex-column align-items-center justify-content-center">
    
      <FontAwesomeIcon style={{ color: 'white', width:'0.7cm',height:'0.7cm' }} icon={props.icon} />
      <p style={{ color: 'white', marginTop: '0.5rem' }}>{props.text}</p>
      
    </div>
  );
};

export default DashboardNav;
