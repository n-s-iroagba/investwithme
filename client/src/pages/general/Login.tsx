import React from 'react';
import LoginForm from '../../components/forms/LoginForm';
import { LoginOption } from '../../components/AuthOption';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Information from '../../components/Information';




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
 <LoginOption
            title='Forgot password?'
            buttonText='Forgot password'
             route='forgot-password' />
 </div>
 </div>
  )
}

export default  Login;
