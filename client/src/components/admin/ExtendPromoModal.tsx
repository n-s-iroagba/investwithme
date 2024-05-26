import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { hasEmptyKey } from '../../utils/utils';
import { patchPromo } from '../../utils/promoHepler';
import ErrorMessage from '../general/ErrorMessage';

interface ExtendPromoFormModalProps {
    show: boolean;
    id:number
}

const ExtendPromoFormModal: React.FC<ExtendPromoFormModalProps> = ({ show,id}) => {
    const [formData, setFormData] = useState({
        id:id,
        days: 0,
    });
    const [modalShow, setModalShow] = useState<boolean>(show)
    const [errorMessage, setErrorMessage] = useState('')
useEffect(()=>{
setModalShow(show)
}, [show])
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        let shouldNotSubmit = hasEmptyKey(formData);
        try {
          if (shouldNotSubmit) {
          } else {
            await patchPromo(formData); 
            setModalShow(false); 
          }
        } catch (error) {
          console.error(error);
          setErrorMessage('Error trying to extend promo days');
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
            <ErrorMessage message={errorMessage} />
        </Modal>
    );
};

export default ExtendPromoFormModal;
