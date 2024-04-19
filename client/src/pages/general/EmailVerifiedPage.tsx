import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import {  useNavigate } from 'react-router-dom';
import {  getInvestorAuthData } from '../../utils/auth';

interface EmailVerifiedProps {
  userEmail: string;
}

const EmailVerified: React.FC<EmailVerifiedProps> = ({ userEmail }) => {
  const navigate = useNavigate()
  return (
    <div className="email-verified-container d-flex flex-column align-items-center">
      <FontAwesomeIcon icon={faCheckCircle} className="icon" />
      <h2 className='text-center'>Email Verified</h2>
      <p className='text-center'> Your email address ({userEmail}) has been successfully verified.</p>
      <p className='text-center'>You can now login to access your account.</p>
      <button className = 'button-styles button-width-narrow' onClick={()=>navigate('/login')}>Login</button>
    </div>
  );
};




const EmailVerifiedPage: React.FC = () => {
    const navigate = useNavigate();
    const [userEmail,setUserEmail]= useState('')
    useEffect(() => {
         const authData = getInvestorAuthData()
         if (authData) {
          const email = authData.email
           setUserEmail(email)
          } else {
            navigate('/login');
          }
    }, [navigate]);
  
    return (
      <div className="email-verification-page">
        <h1 className='text-center'>Email Verification Success</h1>
        <EmailVerified userEmail={userEmail} />
      </div>
    );
  };
  
  export default EmailVerifiedPage;
