
import React, { useEffect, useState } from 'react';
import { Modal, Button, Form,Spinner } from 'react-bootstrap';
import { createPromo } from '../../utils/helpers'; // Assuming createPromo is correctly defined
import { hasEmptyKey } from '../../utils/utils';
import { CreatePromoType } from '../../utils/types';

interface PromoFormModalProps {
  show: boolean
}

const PromoFormModal: React.FC<PromoFormModalProps> = ({ show }) => {
  const [promoData, setPromoData] = useState<CreatePromoType>({
    startDate: '',
    endDate: '',
    bonusPercentage: 0,
  });
  const [modalShow, setModalShow] = useState<boolean>(show);
  const [submitting, setSubmitting] = useState<boolean>(false);

  useEffect(() => {
    setModalShow(show);
  }, [show]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPromoData({ ...promoData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let shouldNotSubmit = hasEmptyKey(promoData); 
    try {
      if (shouldNotSubmit) {
        alert('form not properly filled')
      } else {
     setSubmitting(true);
        await createPromo(promoData); 
        setModalShow(false); 
      }
    } catch (error) {
      console.error(error);
      
    }finally{
      setSubmitting(false)
    }
  };

  const onHide = () => {
    setModalShow(false);
  };

  return (
    <Modal show={modalShow} onHide={onHide}>
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
          <Form.Group controlId="formEndDate">
            <Form.Label>Bonus Percentage</Form.Label>
            <Form.Control
              type="number"
              name="bonusPercentage"
              value={promoData.bonusPercentage}
              onChange={handleChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
          {submitting? <Spinner animation='border' size='sm' /> :'Create Promo'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default PromoFormModal;
