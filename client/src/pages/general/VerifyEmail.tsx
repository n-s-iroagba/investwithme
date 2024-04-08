import React, { useEffect, useState } from 'react';
import Information from '../../components/general/Information';
import { faMailchimp } from '@fortawesome/free-brands-svg-icons';
import { useNavigate } from 'react-router-dom';
import { getData } from '../../utils/api';
import { getAuthData,} from '../../utils/auth';
import { resendVerificationTokenRoute } from '../../utils/constants';


const VerifyEmail = () => {
  const [counter, setCounter] = useState(0);
  const navigate = useNavigate();
  const [token, setToken] = useState<any>(null);

  useEffect(() => {
    let storedCounter: number | null = parseInt(localStorage.getItem('cassocktime') || '0', 10);
    if (!storedCounter || isNaN(storedCounter)) {
      storedCounter = 5;
    }
    setCounter(storedCounter);

    const storedToken = localStorage.getItem('cassockJwtToken');
    if (!storedToken || storedToken === null) {
      navigate('/signup');
    } else {
      const decodedToken = getAuthData(storedToken);
    
      if (decodedToken && decodedToken.verificationStatus ==='verifying') {
        navigate('/login');
      } else {
        setToken(decodedToken);
      }
    }

    const interval = setInterval(() => {
      setCounter((prevCounter) => Math.max(0, prevCounter - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [navigate]);

  const verifyAndUpdateToken = async () => {
    const response = await getData(`${resendVerificationTokenRoute}/${token?.id}`);
    if (response) {
      setCounter(600);
      localStorage.setItem('cassockEmailVerificationToken', response.data.data);
    }
  };

  const formatTime = (timeInSeconds: number) => {
    localStorage.setItem('cassocktime', JSON.stringify(timeInSeconds));
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center mt-5 mb-5">
      <Information head='Email has already been verified' text="Email has been previously verified, login to access account" icon={faMailchimp} />
      <div className='button-width-narrower my-3'>
        {counter <= 0 ? formatTime(counter) : <button className='button-styles' onClick={verifyAndUpdateToken}>Resend Token</button>}
      </div>
    </div>
  );
};

export default VerifyEmail;



