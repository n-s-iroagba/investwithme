import React from 'react'

import { faUser } from '@fortawesome/free-solid-svg-icons'
import Information from '../../components/general/Information'
import NewPasswordForm from '../../components/auth/general/NewPasswordForm'

const SignUp:React.FC = ()=>{
    return(
        <div className='px-4 py-4 d-flex flex-column align-items-center'>
        <div className='auth-page-items'>
     
              <Information center= {true}text='Enter new password.' head='New Password' icon={faUser} />
        <NewPasswordForm/>
      
        </div>
        </div>
    )
}
export default SignUp