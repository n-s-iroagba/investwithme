import React from 'react'
import AdminSignUp from '../components/forms/AdminSignUp'
import Information from '../components/Information'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { LoginOption } from '../components/AuthOption'

const AdminSignUpPage:React.FC= ()=>{
    return<div className='px-4 d-flex flex-column align-items-center'>

    <LoginOption/>
    <Information text ='Welcome to the admin registeration page, please note there can only be one admin' head='Account Details' icon ={faUser}/>
    <AdminSignUp/>
    </div>
}
export default AdminSignUpPage