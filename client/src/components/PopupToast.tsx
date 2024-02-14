import React, { useState, useEffect } from 'react';
import { Toast } from 'react-bootstrap';

const PopupToast: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(true);
  const messages = ['I am a clown','clowns are good'];

  useEffect(() => {
    const interval = setInterval(() => {
      toggleShow();
      if (show) {
        setTimeout(() => {
          toggleShow();
          setIndex((prevIndex) => (prevIndex + 1) % messages.length);
        }, 3000); 
      }
    }, 4000); 

    return () => clearInterval(interval);
  }, [index, messages.length, show]);
  const toggleShow = () => {
    setShow((prevShow) => !prevShow);
  };

  return (
    <Toast
      show={show}
      onClose={() => setShow(false)}
      style={{
        position: 'absolute',
        top: '2cm',
        left: '1rem',
        backgroundColor: 'white',
      }}
    >
      <Toast.Body>{messages[index]}</Toast.Body>
    </Toast>
  );
};

export default PopupToast;
