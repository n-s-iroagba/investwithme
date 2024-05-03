import React from 'react'
import AdminSignUpForm from '../../components/auth/admin/AdminSignUpForm'
import Information from '../../components/general/Information'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { LoginOption } from '../../components/auth/general/AuthOption'
import { MiniFooter } from '../../components/home_components/Footer'

const AdminSignUp: React.FC = () => {

    return (
        <div className='px-4 py-4 d-flex flex-column align-items-center'>
            <div className='auth-page-items full-height'>
            <LoginOption
            title='Already have an account?'
            buttonText='Login'
             icon = {faUser}
             route='login' />
            <Information text='Welcome to the admin registeration page, please note there can only be one admin.' head='Account Details' icon={faUser} center={true} />
            <AdminSignUpForm />
            </div>
            <MiniFooter/>
        </div>
    )
}
export default AdminSignUp