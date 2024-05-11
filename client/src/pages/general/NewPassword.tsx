import React, { useEffect } from 'react'

import { faUser } from '@fortawesome/free-solid-svg-icons'
import Information from '../../components/general/Information'
import NewPasswordForm from '../../components/auth/general/NewPasswordForm'
import { useNavigate } from 'react-router-dom'

const SignUp:React.FC = ()=>{
    const navigate = useNavigate()

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        if (!token) {
            navigate('/login')
        }
    })
    
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