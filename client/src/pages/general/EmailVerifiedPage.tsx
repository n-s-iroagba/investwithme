import React, { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAuthData } from '../../utils/auth';

interface EmailVerifiedProps {
  userEmail: string;
}

const EmailVerified: React.FC<EmailVerifiedProps> = ({ userEmail }) => {
  return (
    <div className="email-verified-container">
      <FontAwesomeIcon icon={faCheckCircle} className="icon" />
      <h2>Email Verified</h2>
      <p>Your email address ({userEmail}) has been successfully verified.</p>
      <p>You can now login to access your account.</p>
    </div>
  );
};




const EmailVerifiedPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const emailRef = useRef<string>(''); // Initialize with an empty string
  
    useEffect(() => {
      const queryParams = new URLSearchParams(location.search);
      const tokenFromQuery = queryParams.get('token');
      
      if (tokenFromQuery) {
        const decodedToken = getAuthData(tokenFromQuery);
        if (decodedToken) {
          emailRef.current = decodedToken.email; // Store email in emailRef.current
        } else {
          const storedToken = localStorage.getItem('cassockJwtToken');
          if (storedToken) {
            navigate('/dashboard');
          } else {
            navigate('/login');
          }
        }
      }
    }, [location.search, navigate]);
  
    return (
      <div className="email-verification-page">
        <h1>Email Verification Success</h1>
        <EmailVerified userEmail={emailRef.current} />
      </div>
    );
  };
  
  export default EmailVerifiedPage;
