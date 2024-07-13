import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import '../../../common/styles/styles.css'
import { useNavigate } from "react-router-dom";



const CircularButton: React.FC<{icon:any,title:string,path:string,fn?:any}> = ({icon,title,path,fn})=>{
    const navigate = useNavigate()
    return<button onClick={fn?()=>fn():()=>navigate('/'+path)} className="circular-button d-flex py-4 align-items-center justify-content-evenly flex-column"><FontAwesomeIcon icon={icon}/><small>{title}</small></button>
} 

export default CircularButton