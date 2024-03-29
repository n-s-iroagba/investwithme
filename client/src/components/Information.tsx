import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core';
const Information:React.FC<{ head:string,text: string; icon: IconProp }> = (props) => {
    return<div className="px-4">
        <div className="d-flex justify-content-center mb-2"><FontAwesomeIcon className="primary-color icon-size" icon={props.icon}/></div>
        <h4 className="text-center">{props.head}</h4>
        <p  >{props.text}</p>
    </div>
}
export default Information