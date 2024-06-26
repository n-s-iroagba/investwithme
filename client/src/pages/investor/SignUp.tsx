import React from 'react'
import SignUpForm from '../../components/auth/investor/SignUpForm'
import { LoginOption } from '../../components/auth/general/AuthOption'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import Information from '../../components/general/Information'
import { MiniFooter } from '../../components/home_components/Footer'

const SignUp:React.FC = ()=>{
    return(
        <div className='px-4 d-flex flex-column align-items-center'>
        <div className=' py-4 auth-page-items full-height'>
        <LoginOption
            title='Already have an account?'
            buttonText='Login'
             icon = {faUser}
             route='login' />
              <Information center= {true}text='Kindly fill in the form below to get started.' head='Account Details' icon={faUser} />
        <SignUpForm/>
     
        </div>
        <MiniFooter/>
        </div>
    )
}
export default SignUp