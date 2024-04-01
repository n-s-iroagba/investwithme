import React from 'react'
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign, faEnvelope, faFile,} from '@fortawesome/free-solid-svg-icons';
import'../assets/Styles.css'
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { useNavigate } from 'react-router-dom';
import { createInvestment } from '../helpers/api';




export const GetStartedButton:React.FC =()=>{
  const navigate = useNavigate()
    return<button className='button-styles'><div>Invest with this manager</div><div ><FontAwesomeIcon icon={faDollarSign} beatFade/></div></button>
}
export const ViewCerficateButton:React.FC =()=>{

  return<button  className='button-styles'><div>Invest with this manager</div><div ><FontAwesomeIcon icon={faDollarSign} beatFade/></div></button>

}

export const ContactButton:React.FC =()=>{
  return<button className='button-styles'><div>Invest with this manager</div><div ><FontAwesomeIcon icon={faDollarSign} beatFade/></div></button>
}

export const ResendVerificationTokenButton:React.FC<{function:any}> =(props)=>{
  return<button className='button-styles'><div>Invest with this manager</div><div ><FontAwesomeIcon icon={faDollarSign} beatFade/></div></button>

}

export const  SocialMediaButton:React.FC = ()=>{
  return<div>
    <FontAwesomeIcon icon={faFacebook} className='primary-color icon-size' beatFade/>
  </div>
}

export const InvestButton:React.FC<{investorId:number,managerId:number}> =({managerId,investorId})=>{
  const navigate = useNavigate()
  return <button onClick={()=>createInvestment(managerId,investorId,navigate)} className='button-styles'><div>Invest with this manager</div><div ><FontAwesomeIcon icon={faDollarSign} beatFade/></div></button>;
  

}