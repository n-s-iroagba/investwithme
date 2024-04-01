import React from 'react'
import SignUpForm from '../components/forms/SignUpForm'
import { LoginOption } from '../components/AuthOption'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import Information from '../components/Information'

const SignUp:React.FC = ()=>{
    return(
        <div className='px-4 py-4 d-flex flex-column align-items-center'>
        <div className='auth-page-items'>
        <LoginOption
            title='Already have an account?'
            buttonText='Login'
             icon = {faUser}
             route='login' />
              <Information center= {true}text='Kindly fill in the form below to get started.' head='Account Details' icon={faUser} />
        <SignUpForm/>
      
        </div>
        </div>
    )
}
export default SignUp