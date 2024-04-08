// src/components/PaymentConfirmationModal.tsx

import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

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

export const SmallModal:React.FC<{show:boolean,message:string}> = ({show,message}) => {
  const [showModal, setShowModal] = useState<boolean>(show)
  return (
    <Modal show={showModal} >
      <Modal.Body>
      <div className='d-flex justify-content-evenly'>
       <div>{message}</div> <FontAwesomeIcon onClick={()=>setShowModal(false)} icon={faTimes}/>
       </div>

      </Modal.Body>
    </Modal>
  );
}

export default ConfirmationModal;
