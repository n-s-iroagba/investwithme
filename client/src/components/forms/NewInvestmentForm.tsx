import React, { useEffect, useState } from 'react'
import { Form, Col, Spinner } from 'react-bootstrap'
import { required } from '../auth/general/required'
import ErrorMessage from '../general/ErrorMessage'
import { useNavigate } from 'react-router-dom'
import '../styles.css'
import { CreateInvestmentType, WalletType } from '../../utils/types'
import { InvestmentCreationPayLoad, ManagerData } from '../../../../common/types'
import { findManagerWithHighestMinInvestment, findManagerById, } from '../../utils/utils'
import { createInvestment } from '../../utils/helpers'
import { getInvestorAuthData } from '../../utils/auth'
import { getManagers } from '../../utils/managerHelper'
import { getAdminWallets } from '../../utils/adminWalletHelper'
const WAValidator = require('multicoin-address-validator')


const NewInvestmentForm: React.FC<{ username: string, }> = ({ username }) => {
  const [submitting, setSubmitting] = useState(false)

  const [wallets, setWallets] = useState<WalletType[]>([]);
  const [walletVerified, setWalletVerified] = useState<boolean>(true)
  const [filteredCurrencywallets, setFilteredCurrencyWallets] = useState<WalletType[]>([]);
  const [filteredBlockchainWallets, setFilteredBlockchainWallets] = useState<WalletType[]>([]);
  const [amount, setAmount] = useState(0)
  const [validated, setValidated] = useState<boolean>(false);
  const [smallAmount, setSmallAmount] = useState<boolean>(false);
  const [tooBigManager, setTooBigManager] = useState<boolean>(false);
  const [address,setAddress] = useState('')
  const dummyManager = {
    id: 0,
    firstName: '',
    lastName: '',
    minimumInvestmentAmount: 0,
    percentageYield: 0,
    duration: 0,
    image: '',
    qualification: ''
  }
  const [investmentData, setInvestmentData] = useState<CreateInvestmentType>({
    amount: 0,
    wallet: {
      network: '',
      address: '',
      currency: '',
      blockchain: ''
    },
    manager: dummyManager

  });
  const [managers, setManagers] = useState<ManagerData[]>([])
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate();
  let id ='1'
  const token = localStorage.getItem('cassockJwtToken');
  if (token){
     const tempId:any = getInvestorAuthData()?.id;
     if (tempId!==undefined){
       id = tempId
     }
    
  }
  useEffect(() => {

    const fetchManagerData = async () => {
      try {
        const managerData = await getManagers();

        const walletData = await getAdminWallets();
        console.log(walletData)
        setWallets(walletData);
        setManagers(managerData);
        const managerId = localStorage.getItem('cassockNewInvestmentInitmanagerId');
        const manager = findManagerById(managerData, Number(managerId));
        if (manager) {
          setInvestmentData(i => ({ ...i, manager: manager }));
        }
      } catch (error: any) {
        console.error(error);
        setErrorMessage(error.message);
      }
    };

    fetchManagerData();
  }, [navigate]);





  const handleAmountChange = (e: any) => {
    setAmount(e.target.value)
    const manager = findManagerWithHighestMinInvestment(managers, e.target.value)
    
    if (manager) {
      setInvestmentData({
        ...investmentData,
        amount: e.target.value,
        manager: manager
      });
      setSmallAmount(false)
    } else {
      setInvestmentData({
        ...investmentData,
        manager: dummyManager
      });
      setSmallAmount(true)
    }
  }

  const handleManagerChange = (e: any) => {
    const manager = e.label
    if (investmentData.amount < manager.minimumAmount) {
      setTooBigManager(true)
    } else {
      setInvestmentData({
        ...investmentData,
        manager: manager
      });
      setTooBigManager(false)
    }
  }
  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInvestmentData(prevData => ({
      ...prevData,
      wallet: {
        ...prevData.wallet,
        currency: e.target.value
      }
    }));
    const newfilteredWallets = wallets.filter(wallet => wallet.currency === e.target.value);
    setFilteredCurrencyWallets(newfilteredWallets);

  };
  const handleBlockchainChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInvestmentData(prevData => ({
      ...prevData,
      wallet: {
        ...prevData.wallet,
        blockchain: e.target.value
      }
    }));
    const newfilteredWallets = filteredCurrencywallets.filter(wallet => wallet.blockchain === e.target.value);
    setFilteredBlockchainWallets(newfilteredWallets);

  };

  const handleNetworkChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setInvestmentData(prevData => ({
      ...prevData,
      wallet: {
        ...prevData.wallet,
        network: value
      }
    }));
  };

  const verifyAddress = (address: any) => {
    return WAValidator.validate(address, investmentData.wallet.blockchain)
  }

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    try {
      setAddress(value)
      setWalletVerified(verifyAddress(value))
      if (walletVerified) {
        setInvestmentData(prevData => ({
          ...prevData,
          wallet: {
            ...prevData.wallet,
            address: value
          }
        }));
      }
    } catch (e: any) {
    console.error(e)
      setErrorMessage('The address provided is invalid');
    }
  }

  const submitInvestment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    let shouldSubmit: boolean = true;

    if (form.checkValidity() === false || tooBigManager || smallAmount) {
      setValidated(false);
      shouldSubmit = false;
      event.stopPropagation();
    } else {
      setValidated(true);
    }

    if (shouldSubmit) {
      setSubmitting(true);
      try {
        const data:InvestmentCreationPayLoad= {
          amount: investmentData.amount,
          wallet: investmentData.wallet,
          managerId: investmentData.manager.id
        }
        const response = await createInvestment(data,id);
        if (response && response.status === 200) {
          console.log(response.data);
          localStorage.setItem('cassockPaymentWallet', JSON.stringify(response.data));
          navigate('/invest/payment');
        }
      } catch (error: any) {
        setErrorMessage('We are sorry, we cannot create new Investment portfolio at this time');
        console.error(error);
      }finally{
        setSubmitting(false);
      }
    }
  };


  return (
    <>
      <h6 className='text-center w-100'>*{`${username}'s`} first portfolio*</h6>
      <Form className="form py-5" noValidate validated={validated} onSubmit={submitInvestment}
      >

        <Form.Group className='mb-4' as={Col} lg="12" controlId="validationFormik04">
          <Form.Label>Investment Amount (in USD) {required}</Form.Label>
          <Form.Control
            required
            type="number"
            name="amount"
            value={amount}
            onChange={(e)=>handleAmountChange(e)}
            className=" custom-input bg-transparent form-control text-light"
          />
        </Form.Group>
        <br />
        <Form.Group className='mb-4' as={Col} lg="12" controlId="validationFormik04">
          <Form.Label className='mb-0'>Investment Manager{required}</Form.Label>
          <Form.Select onChange={(e) => handleManagerChange(e)} value={investmentData.manager.firstName}>
            <option value={investmentData.manager.id}>{investmentData.manager.firstName} {investmentData.manager.lastName}</option>
            {managers.map((manager, index) => (
              <option key={index} value={manager.id}>
                {manager.firstName} {manager.lastName}
              </option>
            ))}
          </Form.Select>
        </Form.Group>


        {wallets && (
          <>
            <Form.Group className="mb-3" controlId="validationFormik04">
              <Form.Label>Currency {required}</Form.Label>
              <Form.Select onChange={(e) => handleCurrencyChange(e)} value={investmentData.wallet.currency} >
                <option value="">Choose...</option>
                {wallets.map((wallet, index) => (
                  <option key={wallet.id} value={wallet.currency} className='text-dark'>
                    {wallet.currency}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="validationFormik04">
              <Form.Label>Blockchain {required}</Form.Label>
              <Form.Select onChange={(e) => handleBlockchainChange(e)}>
                <option value="">Choose...</option>
                {filteredCurrencywallets.map((wallet) => (
                  <option key={wallet.id} value={wallet.blockchain}>
                    {wallet.blockchain}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="validationFormik04">
              <Form.Label>Network {required}</Form.Label>
              <Form.Select onChange={(e) => handleNetworkChange(e)}>
                <option value="">Choose...</option>
                {filteredBlockchainWallets.map((wallet) => (
                  <option key={wallet.id} value={wallet.network}>
                    {wallet.network}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </>
        )}

        <br />
        <Form.Group as={Col} lg="12" controlId="validationFormik04">
          <Form.Label>Wallet address{required}</Form.Label>
          <Form.Control
            required
            type="text"
            name="investmentName"
            value={address}
            onChange={handleAddressChange}
            className=" custom-input bg-transparent form-control text-light"
          />
          <Form.Text className='text-light'>*The wallet you wish to receive your profits, it should be same as the wallet you will make deposits with.</Form.Text>
        </Form.Group>

        <br />

        <div className='d-flex justify-content-evenly w-100'>
          <button className='button-styles w-50 text-light' type={submitting ? 'submit' : 'submit'}>
            {submitting ? <Spinner animation='border' size='sm' /> : 'Submit'}
          </button>
          <button className='button-styles text-light w-50' onClick={() => navigate('/dashboard')}> Dashboard</button>
        </div>
      </Form>
      <ErrorMessage message={errorMessage} />

    </>
  )
}
export default NewInvestmentForm

