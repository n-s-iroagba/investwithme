import React, { useEffect, useState } from 'react';
import Information from '../../components/general/Information';
import { faMailchimp } from '@fortawesome/free-brands-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { getData } from '../../utils/api';
import { resendVerificationTokenRoute } from '../../utils/constants';
import { EmailVerificationToken } from '../../utils/types';
import { getVerificationTokenData } from '../../utils/auth';
import ErrorMessage from '../../components/general/ErrorMessage';
import { Spinner } from 'react-bootstrap';


const VerifyEmail = () => {
  const [counter, setCounter] = useState(0);
  const [errorMessage, setErrorMessage] = useState('')
  const [submitting,setSubmitting] = useState(false)
  const navigate = useNavigate();
  const [token, setToken] = useState<any>(null);
  const location = useLocation()
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const queryToken = params.get('token')
    if (queryToken) {
      localStorage.setItem('cassockEmailVerificationToken',queryToken)
      const { origin, pathname } = window.location;
      window.history.replaceState({}, document.title, `${origin}${pathname}`);
    }
    const storedToken = localStorage.getItem('cassockEmailVerificationToken');
    if (!storedToken) {
      navigate('/login');
    } else {
      const decodedToken: EmailVerificationToken = getVerificationTokenData(storedToken);

      if (!decodedToken) {
        navigate('/login');
      } else {
        setToken(decodedToken);
        const dateString = decodedToken.timeOfCreation;
        const dateObject = new Date(dateString);
        const currentTime = new Date().getTime();
        const dateObjectTime = dateObject.getTime();
        const minutesDifference = (currentTime - dateObjectTime) / (1000 * 60);
        if (minutesDifference < 10) {
          setCounter(600-Math.floor(minutesDifference * 60));
        }
      }
    }
    const interval = setInterval(() => {
      setCounter((prevCounter) => Math.max(0, prevCounter - 1));
      const verificationStatus = localStorage.getItem('cassockVerified')
      // if (verificationStatus){
      //   alert('close')
      //   setCounter(0)
      //   window.close()
      // }
    }, 1000);

    return () => clearInterval(interval);
  }, [location.search, navigate]);

  const verifyAndUpdateToken = async () => {
  
    const savedToken = localStorage.getItem('cassockEmailVerificationToken')
    setSubmitting(true)
 
    try{
    const response = await getData(`${resendVerificationTokenRoute}/${token?.id}`,savedToken);
    if (response.status === 200) {
      
      localStorage.setItem('cassockEmailVerificationToken', response.data);
    }
    window.location.reload()
  }catch(error){
    console.error(error)
    setErrorMessage('Sorry we can not refresh your token at this time.')
  }finally{
    setSubmitting(false)
  }
  };

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center mt-5 mb-5">
    {counter > 0 ? (
      <>
        <Information head='Verify your Email Address' text="Kindly open your registration email and verify email address." icon={faMailchimp} center/>
        <p className='py-0 text-nowrap'>Token will expire in {formatTime(counter)} seconds</p>
      </>
    ) : (
      <>
        <Information head='Verify your Email Address' text="The token we sent is expired, kindly click the button to get a new token" icon={faMailchimp} center/>
        <div className='button-width-narrower my-3'>
          <button className='button-styles' onClick={()=>verifyAndUpdateToken()}>{submitting?<Spinner animation='border' size='sm'/>:'Resend Token'}</button>
          
        </div>
      </>
    )}
    <ErrorMessage message={errorMessage} />
  </div>
  );
};

export default VerifyEmail;



