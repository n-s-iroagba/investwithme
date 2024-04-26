import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { deleteManager, deleteWallet } from '../../utils/helpers';


const DeleteModal:React.FC<{id:number,show:boolean,entity:'wallet'|'manager'|'investor'}>= ({ id, show,entity }) => {
  const [error, setError] = useState('');
  const [showModal, setShowModal]= useState(false);
  const [password, setPassword] = useState('');
  const secretCode =  process.env.REACT_APP_ADMIN_SECRET_KEY

  useEffect(() => {
    setShowModal(show);
  }, [show])

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  
  const handleClose = ()=>{
    setShowModal(false);
    window.location.reload()
  }

  const handleConfirm = () => {
    if (password === secretCode) {
    if (entity==='manager'){
      deleteManager(id)
    }else if(entity==='wallet'){
      deleteWallet(id)

    }else if (entity==='investor'){
      deleteInvestor(id)
    }
    
    handleClose();
    } else {
      setError('Incorrect secretCode')
    }
  };


  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete {entity}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="adminPassword">
          <Form.Label>Enter Admin Secret Code:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={handlePasswordChange}
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

export default DeleteModal;
function deleteInvestor(id: number) {
  throw new Error('Function not implemented.');
}

