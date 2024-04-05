import React, { useState, } from 'react';
import { Col, Form, Row, Spinner } from 'react-bootstrap';
import ErrorMessage from '../general/ErrorMessage';
import {  EditWalletType, WalletType } from '../../utils/types';
import { required } from '../auth/general/required';
import Select from 'react-select';

const WalletForm: React.FC<{ details: EditWalletType|WalletType }> = ({ details }) => {
  const [walletData, setWalletData] = useState<EditWalletType|WalletType>(details);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');


  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setWalletData((prevData:EditWalletType|WalletType) => ({
      ...prevData,
      [name]: value,
    }));
  };

 

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // setSubmitting(true);
  };

  return (
    <div className="d-flex justify-content-center align-content-center mt-5 px-2">
     
      <Form className="form py-5" noValidate onSubmit={handleSubmit}>
     
      <Form.Group className='mb-3' controlId="validationFormik04">
          <Form.Label>Currency {required}</Form.Label>
          <Select options={currrencies} onChange={(e: any) => {
            console.log(e)
            setWalletData({ ...walletData, currency: e.label })
          }} className=' bg-transparent form-control' />
        </Form.Group>

        <Form.Group className='mb-3' controlId="validationFormik04">
          <Form.Label>Blockchain {required}</Form.Label>
          <Select options={blockchains} onChange={(e: any) => {
            console.log(e)
            setWalletData({ ...walletData, blockchain: e.label })
          }} className=' bg-transparent form-control' />
        </Form.Group>
        <Form.Group className='mb-3' controlId="validationFormik04">
          <Form.Label>Network {required}</Form.Label>
          <Select options={countries} onChange={(e: any) => {
            console.log(e)
            setWalletData({ ...walletData, network: e.label })
          }} className=' bg-transparent form-control' />
        </Form.Group>



        <Form.Group className="mb-4" as={Col} controlId="validationFormik01">
          <Form.Label className="mb-0">Address{required}</Form.Label>
          <Form.Control
            required
            type="text"
            name="qualification"
            value={walletData.address}
            onChange={handleChange}
            className="text-light custom-input bg-transparent form-control"
          />
        </Form.Group>

       
        <div className="d-flex justify-content-evenly w-100">
          <button className="button-styles w-50 text-light" type={submitting ? 'submit' : 'submit'}>
            Submit
          </button>
          <button className="button-styles text-light w-50">Home</button>
        </div>
      </Form>
      <ErrorMessage message={errorMessage} />
    </div>
  );
};

export default WalletForm;
