import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { ExtendPromoFormModalProps } from '../types/types';
import { hasEmptyKey } from '../../../common/utils/utils';
import { patchPromo } from '../helpers/promoApiHelpers';
import ErrorMessage from '../../../common/components/ErrorMessage';
import { ExtendPromoDto } from '../../../../../common/promoTypes';






                                                               

const ExtendPromoFormModal: React.FC<ExtendPromoFormModalProps> = ({ show,id}) => {
    const [formData, setFormData] = useState<ExtendPromoDto|null>(null);
    const [modalShow, setModalShow] = useState<boolean>(show)
    const [errorMessage, setErrorMessage] = useState('')
useEffect(()=>{
setModalShow(show)
}, [show])

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      if (prevFormData) {
        return { ...prevFormData, [name]: value };
      }
      return null;
    });
  };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        let shouldNotSubmit =  formData && hasEmptyKey(formData);
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
                            value={formData?.days}
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
