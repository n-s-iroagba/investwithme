import React from "react";
import ChangePasswordEmailForm from "../../components/auth/general/ChangePasswordEmailForm";
import Information from "../../components/general/Information";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import '../../components/styles.css'


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