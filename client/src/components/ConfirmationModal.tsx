// src/components/PaymentConfirmationModal.tsx

import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

interface ConfirmationModalProps {
  show: boolean;
  acceptRoute:string,
  rejectRoute:string,
  message:string,
  title:string
  onClose: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ show, onClose,acceptRoute,rejectRoute,message,title }) => {
  const navigate = useNavigate(); // Get the navigate object

  const handleAccept = () => {
    // Navigate to 'invest-payment' route
    navigate(`/${acceptRoute}`);
    onClose(); // Close the modal
  };

  const handleReject = () => {
    // Navigate to 'invest-manager' route
    navigate(`/${rejectRoute}`);
    onClose(); // Close the modal
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
       {message}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleReject}>
          Reject
        </Button>
        <Button variant="primary" onClick={handleAccept}>
          Accept
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationModal;
