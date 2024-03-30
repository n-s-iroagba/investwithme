import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

interface PaymentWalletFormProps {
  label: string;
}

const PaymentWalletForm: React.FC<PaymentWalletFormProps> = ({ label }) => {
  const [text, setText] = useState<string>(''); // Initialize with an empty string

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text);
      alert('Text copied to clipboard!');
    } catch (error) {
      console.error('Error copying text:', error);
    }
  };

  return (
    <Form className="form pt-5 pb-1">
      <Form.Group controlId="paymentWalletForm">
        <Form.Label>{label}</Form.Label>
        <Form.Control
          type="text"
          value={text}
          onChange={handleInputChange}
          placeholder="Enter text to copy"
        />
        <Form.Text className="text-muted">
          Click the button to copy the text to the clipboard.
        </Form.Text>
      </Form.Group>
      <Button variant="primary" onClick={handleCopyToClipboard} disabled={!text}>
        Copy to Clipboard
      </Button>
    </Form>
  );
};

export default PaymentWalletForm;
