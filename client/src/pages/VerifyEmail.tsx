import React, { useEffect, useState } from 'react'
import Information from '../components/Information';
import { faMailchimp } from '@fortawesome/free-brands-svg-icons';
import { ResendVerificationTokenButton } from '../components/Button';

const VerifyEmail=() => {
  const [counter, setCounter] = useState(600);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prevCounter) => prevCounter - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const formatTime = (timeInSeconds:number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };
  return (
 
      <div className="d-flex flex-column justify-content-center align-items-center mt-5 mb-5 ">
         <Information head='Verify your Email Address' text="Kindly open your registration email and verify email address." icon={faMailchimp} />
        <>{counter > 0 ? (
        <p className='py-0 text-nowrap'>Token will expire in {formatTime(counter)} seconds</p>
      ) : ( <div className='button-width-narrower my-3'><ResendVerificationTokenButton/></div>)}</>
    </div>
  );
}

export default  VerifyEmail;
