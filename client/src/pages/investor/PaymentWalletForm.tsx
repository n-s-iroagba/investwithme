import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { WalletType } from '../../utils/types';
import '../../components/styles.css'
import Information from '../../components/general/Information';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
import SuccessModal from '../../components/general/SuccessModal';
import { FormControl } from 'react-bootstrap';
import { MiniFooter } from '../../components/home_components/Footer';


const PaymentWalletForm: React.FC = () => {
  const [wallet, setWallet] = useState<WalletType>({
    id: 0,
    address: 'no address available',
 
    currency: 'not available',
  
  })
  const [showModal, setShowModal] = useState<boolean>(false)

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
    console.log(storedWallet)

    if (storedWallet) {
      setWallet(JSON.parse(storedWallet));
      setShowModal(true);
    }
  }, [])

  return (
    <div className='d-flex flex-column pt-3 align-items-center'>
      <SuccessModal propShow={showModal} message={'Porfolio successfully created'} />
      <Information center head={'Proceed to make your deposit'} text={'Copy the wallet address and make a transfer, be sure to take note of the currency, in order not to loose your deposit'} icon={faDollarSign} />
      <Form className="form py-5">
        <Form.Group className='mb-4'>
          <Form.Label>Currency:</Form.Label>
          <FormControl
            value={wallet.currency}
            className='px-0 text-center text-light custom-input bg-transparent form-control'

          />
        </Form.Group>
        <Form.Group  className='mb-4'>
          <Form.Label>Copy Payment Address</Form.Label>
          <Form.Control
            type="text"
            value={wallet.address}
            className='px-0 text-center text-light  bg-transparent form-control'
          />
          <Form.Text className="text-light">
            Click the button to copy the text to the clipboard.
          </Form.Text>
        </Form.Group>
        <div className='d-flex justify-content-center'>
        <button className='button-styles button-width-narrow' onClick={handleCopyToClipboard} disabled={wallet.address === 'no address available'}>
          Copy to Clipboard
        </button>
        </div>
      </Form>
      <MiniFooter/>
    </div>
  );
};

export default PaymentWalletForm;
