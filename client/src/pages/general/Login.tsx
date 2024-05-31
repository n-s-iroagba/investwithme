import React from 'react';
import LoginForm from '../../components/auth/general/LoginForm';
import { LoginOption } from '../../components/auth/general/AuthOption';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Information from '../../components/general/Information';
import { MiniFooter } from '../../components/home_components/Footer';




const Login:React.FC=()=>{

  return (
<div className='px-4 py-4 d-flex flex-column align-items-center'>
            <div className='auth-page-items'>
 <LoginOption
            title='Already have an account?'
            buttonText='Signup'
             icon = {faUser}
             route='signup' />
 <Information center= {true}text='' head='Login' icon={faUser} />
 <LoginForm/>
 </div>
 <MiniFooter/>
 </div>
  )
}

export default  Login;
