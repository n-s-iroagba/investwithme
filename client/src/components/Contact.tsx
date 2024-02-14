import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { faPhone,faEnvelope, } from '@fortawesome/free-solid-svg-icons'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import { IconProp } from "@fortawesome/fontawesome-svg-core";



const ContactFields:React.FC<{icon:IconProp,link:string}> = (props) =>{
    return<div style={{height:'7.5cm'} }className="contact">
       < div ><FontAwesomeIcon icon={props.icon} style={{width:'0.8cm',height:'0.8cm',marginBottom:'0.2cm'}}/></div>
        <p>{props.link}</p>
        <p>Monday - Fridays</p>
        <p>8am - 5pm</p>
    </div>
}

const icons = [faPhone,faWhatsapp,faEnvelope,faMapMarkerAlt]
const links = ['07062952223','09021465282','vibranteventmgt@gmail.com','No_53 Danjuma Road Takum Taraba state']
const Contact = ()=>{
    return(
        <div className="contact-wrapper">
        <h1>We'll Be Happy To Hear From You.</h1>
        <div className='contact-us'>{
            links.map((link,index)=>{
                    return <ContactFields icon ={icons[index]} link={link} key={index}/>
            })

        }</div>
            </div>
    )
}
export default Contact