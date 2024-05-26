import React, { useEffect, useState } from 'react';
import { Col, Form, Spinner } from 'react-bootstrap';
import ErrorMessage from '../general/ErrorMessage';
import { CreateWalletType } from '../../utils/types';
import { required } from '../auth/general/required';

import { hasEmptyKey, } from '../../utils/utils';
import { createWallet } from '../../utils/adminWalletHelper';


const WalletForm: React.FC = () => {

  const [walletData, setWalletData] = useState<CreateWalletType>({
    blockchain: '',
    address: '',
    network: '',
    currency: '',
  });
  const networks = ['ERC']
  const blockchains = ['IEB']
  const currencies = ['AB']
  const [validated, setValidated] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {


  }, [])

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>, name: string) => {
    const { value } = e.target;
    setWalletData((prevData: CreateWalletType) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(value)
  };
  const handleChange = (e: any) => {
    const { value } = e.target
    setWalletData((prevData: CreateWalletType) => ({
      ...prevData,
      address: value,
    }));

  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(walletData)
    let shouldNotSubmit = hasEmptyKey(walletData);
    try {
      if (shouldNotSubmit) {
        setValidated(false);
      } else {
        setSubmitting(true);

        await createWallet(walletData);
      }

    } catch (error) {
      console.log(error);
      setErrorMessage('Sorry we cannot complete your request at this time');
    } finally {
      setSubmitting(false)
    }
  };

  return (
    <div className="d-flex justify-content-center flex-column align-content-center mt-5 px-2">
      <Form className="form py-5" noValidate validated={validated} onSubmit={handleSubmit}>

        <Form.Group className="mb-3" controlId="validationFormik04">
          <Form.Label>Currency {required}</Form.Label>
          <Form.Select onChange={(e) => handleSelect(e, 'currency')} value={walletData.currency}>
            <option value="">Choose...</option>
            {currencies.map((currency, index) => (
              <option key={index} value={currency}>
                {currency}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="validationFormik04">
          <Form.Label>Blockchain {required}</Form.Label>
          <Form.Select onChange={(e) => handleSelect(e, 'blockchain')} value={walletData.blockchain}>
            <option value="">Choose...</option>
            {blockchains.map((blockchain, index) => (
              <option key={index} value={blockchain}>
                {blockchain}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="validationFormik04">
          <Form.Label>Network {required}</Form.Label>
          <Form.Select onChange={(e) => handleSelect(e, 'network')} value={walletData.network}>
            <option value="">Choose...</option>
            {networks.map((network, index) => (
              <option key={index} value={network}>
                {network}
              </option>
            ))}
          </Form.Select>
        </Form.Group>


        <Form.Group className="mb-4" as={Col} controlId="validationFormik01">
          <Form.Label className="mb-0">Address{required}</Form.Label>
          <Form.Control
            required
            type="text"
            name="address"
            value={walletData.address}
            onChange={(e) => handleChange(e)}
            className="text-light custom-input bg-transparent form-control"
          />
        </Form.Group>

        <div className="d-flex justify-content-evenly w-100">
          <button className="button-styles w-50 text-light" type={submitting ? 'submit' : 'submit'}>
            {submitting ? <Spinner animation="border" size="sm" /> : 'Submit'}
          </button>
          <button className="button-styles text-light w-50" onClick={() => console.log(walletData)}>Home</button>
        </div>
      </Form>
      <ErrorMessage message={errorMessage} />
    </div>
  );
};

export default WalletForm;
