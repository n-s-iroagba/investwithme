import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { WalletType } from '../../utils/types';
import { patchWallet } from '../../utils/helpers';

const EditWalletModal:React.FC<{data:WalletType,show:boolean}>= ({ data, show }) => {
  const [error, setError] = useState<string|null>(null);
  const [showModal, setShowModal]= useState(show);
  const [walletData, setWalletData]= useState<WalletType>(data);
  
  useEffect(() => {
    setShowModal(show);
    setWalletData(data)
  }, [data, show])
  const handleClose = ()=>{
    setShowModal(false);
    window.location.reload()
  }

  const handleConfirm = async () => {
    try{
     patchWallet(walletData);
    }catch(error:any){
      setError('Sorry an error occured while attempting to edit wallet')
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
        <Modal.Title>Update Wallet Address</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="adminPassword">
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
