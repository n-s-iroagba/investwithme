import React from 'react'
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
import'../assets/Styles.css'
const Button: React.FC<{ text: string; icon: IconProp }> = (props) => {
  return <button className='button-styles'><div>{props.text}</div><div ><FontAwesomeIcon icon={props.icon} beatFade/></div></button>;
};

export default Button;

export const GetStartedButton:React.FC =()=>{
    return<Button text='Become an investor' icon ={faDollarSign}/>

}
