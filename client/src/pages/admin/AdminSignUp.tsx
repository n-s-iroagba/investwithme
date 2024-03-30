import React from 'react'
import AdminSignUpForm from '../../components/forms/AdminSignUpForm'
import Information from '../../components/Information'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { LoginOption } from '../../components/AuthOption'

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
            <LoginOption
            title='forgot password?'
            buttonText='Change password'
             icon = {faUser}
             route='forgot-password' />
            </div>
        </div>
    )
}
export default AdminSignUp