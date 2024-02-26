import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'


export const LoginOption:React.FC= ()=>{
return<>
   <div className='py-4 d-flex align-items-center'>
        <p className='px-2'>Already have an account?</p>
        <div className='px-2'><button className='button-styles button-width-narrower'> Login <FontAwesomeIcon icon={faUser} beatFade/></button></div>
    </div>
    </>
}