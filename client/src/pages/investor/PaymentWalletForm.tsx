import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { WalletType } from '../../utils/types';
import '../../components/styles.css'
import Information from '../../components/general/Information';
import { SmallModal } from '../../components/investor/ConfirmationModal';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';


const PaymentWalletForm: React.FC = () => {
  const [wallet,setWallet] = useState<WalletType>({
    address:'no address available',
    blockchain:'not available',
    currency:'not available',
    network:'not available'
  })
  const [showModal,setShowModal] = useState<boolean>(false)

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(wallet.address);
      alert('Text copied to clipboard!');
    } catch (error) {
      console.error('Error copying text:', error);
    }
  };
 useEffect(() => {
  const storedWallet = localStorage.getItem('cassockPaymentWallet');
  
  if (storedWallet) {
    setWallet(JSON.parse(storedWallet));
    setShowModal(true);
  }
 }, [])

  return (
   <>
   <SmallModal show={showModal} message={'Porfolio successfully created'}/>
   <Information head={'Proceed to make your deposit'} text={'Copy the wallet address and make a transfer, be sure to take note of the currency, blockchain and network'} icon={faDollarSign}/>
    <Form className="form pt-5 pb-1">
    <Form.Group controlId="paymentWalletForm">
        <Form.Label>Currency</Form.Label>
        <div>{wallet.currency}</div>
    </Form.Group>
    <Form.Group controlId="paymentWalletForm">
        <Form.Label>Blockchain</Form.Label>
        <div>{wallet.blockchain}</div>
    </Form.Group>
    <Form.Group controlId="paymentWalletForm">
        <Form.Label>Network</Form.Label>
        <div>{wallet.network}</div>
    </Form.Group>
      <Form.Group controlId="paymentWalletForm">
        <Form.Label>Copy Payment Address</Form.Label>
        <Form.Control
          type="text"
          value={wallet.address}
          className='text-light custom-input bg-transparent form-control'
          placeholder="Enter text to copy"
        />
        <Form.Text className="text-muted">
          Click the button to copy the text to the clipboard.
        </Form.Text>
      </Form.Group>
      <Button variant="primary" onClick={handleCopyToClipboard} disabled={wallet.address === 'no address available'}>
        Copy to Clipboard
      </Button>
    </Form>
    </>
  );
};

export default PaymentWalletForm;
