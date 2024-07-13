import React, {useState } from 'react';
import { Col, Form, Spinner } from 'react-bootstrap';
import { CreateWalletDto } from '../../../../../common/walletTypes';
import { hasEmptyKey } from '../../../common/utils/utils';
import { createWallet } from '../helpers/walletHelper';
import { required } from '../../auth/components/required';
import ErrorMessage from '../../../common/components/ErrorMessage';
import '../../../common/styles/styles.css'



const WalletForm: React.FC = () => {

  const [walletData, setWalletData] = useState<CreateWalletDto>({
    address: '',
    currency: '',
  });
  const [validated, setValidated] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');



  const handleChange = (e: any) => {
    let { name,value } = e.target
     if (name === 'currency'){
      value = value.toUpperCase()
     }
    setWalletData((prevData: CreateWalletDto) => ({
      ...prevData,
      [name]: value,
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
      console.error(error);
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
          <Form.Control
            required
            type="text"
            name="currency"
            value={walletData.currency}
            onChange={(e) => handleChange(e)}
            className="text-light custom-input bg-transparent form-control"
          />
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
