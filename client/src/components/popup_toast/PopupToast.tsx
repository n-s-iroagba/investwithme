import React, { useState, useEffect } from 'react';
import { Toast } from 'react-bootstrap';

const ToastComponent: React.FC = () => {
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('Initial message');

  const toggleToast = () => setShowToast(!showToast);

  useEffect(() => {
    let toastTimer: NodeJS.Timeout;
    if (showToast) {
      toastTimer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } else {
      toastTimer = setTimeout(() => {
        setToastMessage('New message');
        setShowToast(true);
      }, 2000);
    }

    return () => clearTimeout(toastTimer);
  }, [showToast]);

  return (
    <div style={{ position: 'relative'}}>
      <Toast
        show={showToast}
        onClose={toggleToast}
        style={{
          position: 'absolute',
          top: '-2cm',
          left: showToast ? 0 : '-100%',
        }}
      >
        <Toast.Header>
          <strong className="me-auto">Toast Header</strong>
          <small>Just now</small>
        </Toast.Header>
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>
    </div>
  );
};

export default ToastComponent;
