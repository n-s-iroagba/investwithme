import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

interface ExtendPromoFormModalProps {
    show: boolean;
    onHide: () => void;
}

const ExtendPromoFormModal: React.FC<ExtendPromoFormModalProps> = ({ show, onHide }) => {
    const [formData, setFormData] = useState({
        days: '1',
        details: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Add your form submission logic here
        console.log(formData);
        // Reset form data after submission (optional)
        setFormData({ days: '1', details: '' });
        onHide(); // Close the modal
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Extend Promo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formDays">
                        <Form.Label>Number of Days</Form.Label>
                        <Form.Control
                            as="select"
                            name="days"
                            value={formData.days}
                            onChange={handleChange}
                        >
                            {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => (
                                <option key={day} value={day.toString()}>
                                    {day}
                                </option>
                            ))}
 
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="formDetails">
                        <Form.Label>Additional Details</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="details"
                            value={formData.details}
                            onChange={handleChange}
                            placeholder="Enter additional details..."
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Extend Promo
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default ExtendPromoFormModal;
