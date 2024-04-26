
import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { createPromo } from '../../utils/helpers'; // Assuming createPromo is correctly defined
import { hasEmptyKey } from '../../utils/utils';

interface PromoFormModalProps {
  show: boolean;
}

const PromoFormModal: React.FC<PromoFormModalProps> = ({ show }) => {
  const [promoData, setPromoData] = useState({
    startDate: '',
    endDate: '',
  });
  const [modalShow, setModalShow] = useState<boolean>(show);

  useEffect(() => {
    setModalShow(show);
  }, [show]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPromoData({ ...promoData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let shouldNotSubmit = hasEmptyKey(promoData); // Assuming hasEmptyKey is defined or imported
    try {
      if (shouldNotSubmit) {
        // Handle validation or show error message
      } else {
        // Perform submission
        await createPromo(promoData); // Assuming createPromo handles the API call correctly
        setModalShow(false); // Close the modal after successful submission
      }
    } catch (error) {
      console.error(error);
      // Handle error or show error message
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

          <Button variant="primary" type="submit">
            Create Promo
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default PromoFormModal;
