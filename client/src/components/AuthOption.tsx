import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'


export const LoginOption:React.FC<{route:string}>= ({route})=>{
const navigate = useNavigate()
return<>
   <div className='w-100 d-flex align-items-center justify-content-between'>
        <p>Already have an account?</p>
        <div><button onClick={()=>navigate(`/${route}`)} className='button-styles button-width-narrower'> Login <FontAwesomeIcon icon={faUser} beatFade/></button></div>
    </div>
    </>
}