import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';


interface PromoFormModalProps {
    show: boolean;
  }
  
const PromoFormModal: React.FC<PromoFormModalProps> = ({ show }) => {
    const [promoData, setPromoData] = useState({
      startDate: '',
      endDate: '',
    });
    const [modalShow, setModalShow] = useState<boolean>(show)

useEffect(()=>{
  console.log(show)
    setModalShow(show)
    },[setModalShow,show])



  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setPromoData({ ...promoData, [name]: value });
  };
 const onHide = () => {

 }
  const handleSubmit = (e:any) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log(promoData);
    // Reset form data after submission (optional)
    setPromoData({ startDate: '', endDate: '' });
    onHide(); // Close the modal
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Create Promo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formStartDate">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              name="startDate"
              value={promoData.startDate}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
            />
          </Form.Group>

          <Form.Group controlId="formEndDate">
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              name="endDate"
              value={promoData.endDate}
              onChange={handleChange}
              min={promoData.startDate}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Create Promo
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default PromoFormModal;
