import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { Col, Row } from 'react-bootstrap'


export const LoginOption:React.FC<{route:string,title:string,buttonText:string,icon?:IconProp}>= ({route,title,buttonText,icon})=>{
const navigate = useNavigate()
return<>

<Row>
    <Col className='d-flex justify-content-center align-items-center' xs={3} md={8}>
Logo
</Col>
<Col>
   <div className='w-100 mb-3 d-flex align-items-end flex-column justify-content-between'>
        <p>{title}</p>
        <div><button onClick={()=>navigate(`/${route}`)} className='button-styles button-width-narrower'>{icon && <FontAwesomeIcon icon ={icon} beatFade/>}{buttonText}</button></div>
    </div>
    </Col>
    </Row>
    </>
}