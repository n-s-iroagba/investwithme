import React from 'react';
import {  useNavigate } from 'react-router-dom';



const EmailVerificationError: React.FC= () => {
  const navigate = useNavigate()
  return (
    <div className="mt-4 email-verified-container d-flex flex-column align-items-center">
      <h2 className='text-center'>Email Verification Error</h2>
      <p className='text-center'> An Error occured while attempting to verify your mail.</p>
      <p className='text-center'>Kindly attempt sign in up with another mail.</p>
      <button className = 'button-styles button-width-narrow' onClick={()=>navigate('/signup')}>Attempt sign up with another mail</button>
    </div>
  );
};





  export default EmailVerificationError;
