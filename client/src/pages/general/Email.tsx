import React from "react";
import ChangePasswordEmailForm from "../../components/forms/ChangePasswordEmailForm";
import Information from "../../components/Information";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import '../../assets/Styles.css'


const Email = ()=>{
    return(
        <div className='px-4 py-4 d-flex flex-column align-items-center'>
        <div className='auth-page-items'>
            <Information text='To retrieve password enter your registration email.' center={true} head='Enter email' icon={faUser} />
            <ChangePasswordEmailForm/>
        </div>
        </div>
    )
}
export default Email