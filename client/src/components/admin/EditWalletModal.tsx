import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { WalletType } from '../../utils/types';

const EditWalletModal:React.FC<{data:WalletType,show:boolean}>= ({ data, show }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showModal, setShowModal]= useState(false);
  const [walletData, setWalletData]= useState<WalletType>({
    id:0,
    blockchain:"",
    network:'',
    currency:'',
    address:'',
  });

  useEffect(() => {
    setShowModal(show);
    setWalletData(data);
  }, [data, show])

  
  const handleClose = ()=>{
    setShowModal(false);
    window.location.reload()
  }
  const handleConfirm = () => {
    if (password === 'admin') {
      console.log(data);
      handleClose();
    } else {
      setError('Incorrect password');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setWalletData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Wallet Address</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="adminPassword">
          <Form.Label>Update Wallet Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="enter new address"
            value={walletData.address}
            name='address'
            onChange={handleChange}
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

export default EditWalletModal;
