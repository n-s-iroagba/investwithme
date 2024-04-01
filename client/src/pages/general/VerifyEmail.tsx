import React, { useEffect, useState } from 'react';
import Information from '../../components/Information';
import { faMailchimp } from '@fortawesome/free-brands-svg-icons';
import { useNavigate } from 'react-router-dom';
import { getData} from '../../helpers/api';
 import { verifyToken } from '../../helpers/auth';
import { resendVerificationTokenUrl } from '../../helpers/data';

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

    const storedToken = localStorage.getItem('cassockEmailVerificationToken');
    console.log (storedToken)
    if (!storedToken||storedToken===null) {
      navigate('/signup');
    } else {
      const decodedToken = verifyToken(storedToken);
      console.log(decodedToken);
      if (decodedToken?.status !== 'email-verification') {
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
    const response = await getData(`${resendVerificationTokenUrl}/${token?.id}`);
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
      {counter > 0 ? (
        <>
          <Information head='Verify your Email Address' text="Kindly open your registration email and verify email address." icon={faMailchimp} />
          <p className='py-0 text-nowrap'>Token will expire in {formatTime(counter)} seconds</p>
        </>
      ) : (
        <>
          <Information head='Verify your Email Address' text="The token we sent is expired, kindly click the button to get a new token" icon={faMailchimp} />
          <div className='button-width-narrower my-3'>
            <button className='button-styles' onClick={verifyAndUpdateToken}>Resend Token</button>
          </div>
        </>
      )}
    </div>
  );
};

export default VerifyEmail;
