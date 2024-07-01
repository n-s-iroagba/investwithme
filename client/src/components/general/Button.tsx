import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign} from '@fortawesome/free-solid-svg-icons';
import'../styles.css'
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { useNavigate } from 'react-router-dom';







export const GetStartedButton:React.FC =()=>{
  const navigate = useNavigate()
    return<button onClick={()=>navigate('/invest/managers')} className='button-styles button-width-narrower'><div className='text-light'>Get Started</div><div ><FontAwesomeIcon icon={faDollarSign} style={{color:'white'}} beatFade/></div></button>
}
export const SelectManagerButton: React.FC<{ managerId?: number }> = ({ managerId }) => {
  const navigate = useNavigate();

  const handleInvestClick = () => {
      localStorage.setItem('cassockNewInvestmentInitmanagerId', JSON.stringify(managerId));
      navigate('/invest');
  };

  return (
      <button onClick={handleInvestClick} className='button-styles'>
          Invest with this Manager
      </button>
  );
};



export const  SocialMediaButton:React.FC = ()=>{
  return<div>
    <FontAwesomeIcon icon={faFacebook} className='primary-color icon-size' beatFade/>
  </div>
}







