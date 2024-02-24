import React from 'react'
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign, faEnvelope, faFile } from '@fortawesome/free-solid-svg-icons';
import'../assets/Styles.css'
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
const Button: React.FC<{ text: string; icon: IconProp }> = (props) => {
  return <button className='button-styles'><div>{props.text}</div><div ><FontAwesomeIcon icon={props.icon} beatFade/></div></button>;
};

export default Button;

export const GetStartedButton:React.FC =()=>{
    return<Button text='Become an investor' icon ={faDollarSign}/>

}
export const ViewCerficateButton:React.FC =()=>{
  return<Button text='View certificate of incorporation' icon ={faFile}/>

}

export const ContactButton:React.FC =()=>{
  return<Button text='Get in Touch' icon ={faEnvelope}/>

}

export const  SocialMediaButton:React.FC = ()=>{
  return<div>
    <FontAwesomeIcon icon={faFacebook} className='primary-color icon-size' beatFade/>
  </div>
}