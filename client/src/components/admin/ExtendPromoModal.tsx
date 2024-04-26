import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { hasEmptyKey } from '../../utils/utils';
import { patchPromo } from '../../utils/helpers';

interface ExtendPromoFormModalProps {
    show: boolean;
}

const ExtendPromoFormModal: React.FC<ExtendPromoFormModalProps> = ({ show}) => {
    const [formData, setFormData] = useState({
        days: 0,
    });
    const [modalShow, setModalShow] = useState<boolean>(show)
useEffect(()=>{
setModalShow(show)
}, [show])
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        let shouldNotSubmit = hasEmptyKey(formData); // Assuming hasEmptyKey is defined or imported
        try {
          if (shouldNotSubmit) {
            // Handle validation or show error message
          } else {
            // Perform submission
            await patchPromo(formData); // Assuming createPromo handles the API call correctly
            setModalShow(false); // Close the modal after successful submission
          }
        } catch (error) {
          console.error(error);
          // Handle error or show error message
        }
      };
    
    const onHide = () =>{
        setModalShow(false);
        window.location.reload()
    }

    return (
        <Modal show={modalShow} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Extend Promo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formDays">
                        <Form.Label>Number of Days</Form.Label>
                        <Form.Control
                            type="number"
                            name="days"
                            value={formData.days}
                            onChange={handleChange}
                        >
        
 
                        </Form.Control>
                    </Form.Group>
                    <br/>
                    <Button variant="primary" type="submit">
                        Extend Promo
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default ExtendPromoFormModal;
