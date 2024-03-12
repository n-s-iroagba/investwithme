import React from 'react'
import AdminSignUpForm from '../components/forms/AdminSignUpForm'
import Information from '../components/Information'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { LoginOption } from '../components/AuthOption'

const AdminSignUp: React.FC = () => {

    return (
        <div className='px-4 py-4 d-flex flex-column align-items-center'>
            <div className='auth-page-items'>
            <LoginOption route='admin/login' />
            <Information text='Welcome to the admin registeration page, please note there can only be one admin.' head='Account Details' icon={faUser} />
            <AdminSignUpForm />
            </div>
        </div>
    )
}
export default AdminSignUp