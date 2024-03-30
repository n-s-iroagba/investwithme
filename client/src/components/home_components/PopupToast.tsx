import React, { useState, useEffect } from 'react';
import { Toast } from 'react-bootstrap';
import '../../assets/Styles.css'
import { messages } from '../../helpers/data';
const PopupToast: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(true);


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
  }, [index, show]);
  const toggleShow = () => {
    setShow((prevShow) => !prevShow);
  };

  return (
    <Toast
      show={show}
      onClose={() => setShow(false)}
     className='toast-style'
    >
    <Toast.Header>
        <strong className="me-auto background-primary">$$$$$</strong>
        <small>{messages[index].time}</small>
      </Toast.Header>
      <Toast.Body>{messages[index].message}</Toast.Body>
    </Toast>
  );
};

export default PopupToast;
