import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core';
const Information:React.FC<{ head:string,text: string; icon: IconProp }> = (props) => {
    return<div>
        <div className="d-flex justify-content-center"><FontAwesomeIcon style={{color:'#1a6e41'}} icon={props.icon}/></div>
        <h4 style={{fontWeight:'700'}}className="text-center">{props.head}</h4>
        <p className="text-center">{props.text}</p>
    </div>
}
export default Information