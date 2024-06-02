import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { payPromoBonus, payReferral } from '../../utils/helpers';


const PayModal:React.FC<{id:number,show:boolean,confirmAmount:number,paymentEntity:'referral'|'promo'}>= ({ id, show,confirmAmount,paymentEntity}) => {
  const [amount, setAmount] = useState<number>(0);
  const [error, setError] = useState('');
  const [showModal, setShowModal]= useState(false);

  useEffect(() => {
    setShowModal(show);
  }, [show])

  const handleAccountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputAmount = parseFloat(e.target.value);
  setAmount(inputAmount);
  };
  
  const handleClose = ()=>{
    setShowModal(false);
    window.location.reload()
  }
  const handleConfirm = async () => {
    try {
      if (amount === confirmAmount) {
        if (paymentEntity === 'referral') {
          await payReferral(id);
        } else {
          await payPromoBonus(id);
        }
        handleClose();
      } else {
        setError('Incorrect Amount');
        return;
      }

    } catch (error) {
      console.error('Error handling confirmation:', error);
    }
  };
  
  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Admin Verification</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="adminAccount">
          <Form.Label>Enter the amount you transferred:</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={handleAccountChange}
          />
          {error && <Form.Text className="text-danger">{error}</Form.Text>}
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Back
        </Button>
        <Button variant="primary" onClick={handleConfirm}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PayModal;
