import React, { useEffect, useState } from 'react';
import { Col, Form, Spinner } from 'react-bootstrap';
import ErrorMessage from '../general/ErrorMessage';
import { CreateWalletType, CryptoDataType} from '../../utils/types';
import { required } from '../auth/general/required';
import { createWallet, getCryptoData} from '../../utils/helpers';
import { hasEmptyKey,} from '../../utils/utils';


const WalletForm: React.FC = () => {

  const [walletData, setWalletData] = useState<CreateWalletType>({
    blockchain: '',
    address: '',
    network: '',
    currency: '',
  });
 const [networks,setNetworks] = useState<string[]>([])
 const [blockchains,setBlockchains] = useState<string[]>([])
 const [currencies,setCurrencies] = useState<string[]>([])
  const [validated, setValidated] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

useEffect(() => {
 const cryptoData:CryptoDataType = getCryptoData()
 setNetworks(cryptoData.networks)
 setBlockchains(cryptoData.blockchains)
 setCurrencies(cryptoData.currencies)
}, [])

  const handleSelect = (e:any,name:string) => {
    const {value} = e.target
    setWalletData((prevData: CreateWalletType) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleChange = (e: any) =>{
    const {name, value} = e.target
    setWalletData((prevData: CreateWalletType) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
    }
  };

  return (
    <div className="d-flex justify-content-center align-content-center mt-5 px-2">
      <Form className="form py-5" noValidate validated={validated} onSubmit={handleSubmit}>
   
            <Form.Group className="mb-3" controlId="validationFormik04">
              <Form.Label>Currency {required}</Form.Label>
              <Form.Select onChange={(e) => handleSelect(e.target.value, 'currency')} value={walletData.currency}>
                <option value="">Choose...</option>
                {currencies.map((currency,index) => (
                  <option key={index} value={walletData.currency}>
                    {currency}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="validationFormik04">
            <Form.Label>Blockchain {required}</Form.Label>
              <Form.Select onChange={(e) => handleSelect(e.target.value, 'currency')} value={walletData.currency}>
                <option value="">Choose...</option>
                {blockchains.map((blockchain,index) => (
                  <option key={index} value={walletData.blockchain}>
                    {blockchain}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="validationFormik04">
            <Form.Label>Network {required}</Form.Label>
              <Form.Select onChange={(e) => handleSelect(e.target.value, 'currency')} value={walletData.currency}>
                <option value="">Choose...</option>
                {networks.map((network,index) => (
                  <option key={index} value={walletData.network}>
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
          <button className="button-styles text-light w-50">Home</button>
        </div>
      </Form>
      <ErrorMessage message={errorMessage} />
    </div>
  );
};

export default WalletForm;
