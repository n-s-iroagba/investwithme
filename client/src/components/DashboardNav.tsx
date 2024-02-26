import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import '../assets/Styles.css';

const DashboardNav: React.FC<{ icon: IconProp; text: string; action: () => void }> = (props) => {
  return (
    <div onClick={props.action} className="dash-nav">
      <FontAwesomeIcon className="nav-icon" icon={props.icon} />
      <p className="dashbutton-text text-wrap">{props.text}</p>
    </div>
  );
};

export default DashboardNav;
