import React from "react";
import Information from "../../components/general/Information";
import { faMailchimp } from "@fortawesome/free-brands-svg-icons";



const PasswordChangeCheckMail = () => {
    return <div className="pt-5"> 
        <Information head='Check your mail' text="Kindly check your mail to proceed with the request." icon={faMailchimp} center/>
    </div>
}
export default PasswordChangeCheckMail