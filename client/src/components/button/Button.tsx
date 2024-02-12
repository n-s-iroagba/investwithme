import React from 'react'
import { roundButtonborderStyles,buttonStyles } from '../styles';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';

const Button: React.FC<{ text: string; icon: IconProp }> = (props) => {
  return <button style={{...buttonStyles,...roundButtonborderStyles}}><div>{props.text}</div><div ><FontAwesomeIcon icon={props.icon} beatFade/></div></button>;
};

export default Button;

export const GetStartedButton:React.FC =()=>{
    return<Button text='Become an investor' icon ={faDollarSign}/>

}
