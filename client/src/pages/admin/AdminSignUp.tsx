import React from 'react'
import AdminSignUpForm from '../../components/auth/admin/AdminSignUpForm'
import Information from '../../components/general/Information'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { LoginOption } from '../../components/auth/general/AuthOption'

const AdminSignUp: React.FC = () => {

    return (
        <div className='px-4 py-4 d-flex flex-column align-items-center'>
            <div className='auth-page-items'>
            <LoginOption
            title='Already have an account?'
            buttonText='Login'
             icon = {faUser}
             route='admin/login' />
            <Information text='Welcome to the admin registeration page, please note there can only be one admin.' head='Account Details' icon={faUser} />
            <AdminSignUpForm />
            </div>
        </div>
    )
}
export default AdminSignUp