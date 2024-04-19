import React, { useEffect, useState } from 'react'
import { Form, Col, Spinner } from 'react-bootstrap'
import { required } from '../auth/general/required'
import ErrorMessage from '../general/ErrorMessage'
import { useNavigate } from 'react-router-dom'
import '../styles.css'
import { CreateInvestmentType, ManagerType, WalletType } from '../../utils/types'
import { findManagerWithHighestMinInvestment, findManagerById,} from '../../utils/utils'
import { createInvestment, getAdminWallets, getManagers } from '../../utils/helpers'
import Select from 'react-select';
const WAValidator = require('multicoin-address-validator')


const NewInvestmentForm: React.FC<{ username: string,}> = ({ username}) => {
  const [submitting, setSubmitting] = useState(false)

  const [wallets, setWallets] = useState<WalletType[]>([]);
  const [walletVerified, setWalletVerified] = useState<boolean>(true)
  const [filteredCurrencywallets, setFilteredCurrencyWallets] = useState<WalletType[]>([]);
  const [filteredBlockchainWallets, setFilteredBlockchainWallets] = useState<WalletType[]>([]);
  const [validated, setValidated] = useState<boolean>(false);
  const [smallAmount, setSmallAmount] = useState<boolean>(false);
  const [tooBigManager, setTooBigManager] = useState<boolean>(false);
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
  const [managers, setManagers] = useState<ManagerType[]>([])
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate();
  const managerId = localStorage.getItem('cassockNewInvestmentInitmanagerId');


  useEffect(() => {

    const retrievedWallets = getAdminWallets()
    const retrievedManagers = getManagers()
      const manager = findManagerById(retrievedManagers, Number(managerId))
      if (manager) {
        setInvestmentData({ ...investmentData, manager: manager })
      }
      setManagers(retrievedManagers)
      setWallets(retrievedWallets)
  }, [managerId, investmentData])

  const handleAmountChange = (e: any) => {
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

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
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
  }

  const verifyAddress = (address: any) => {
    return WAValidator.validate(address, investmentData.wallet.blockchain)
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
        const response = await createInvestment(investmentData);
        if (response && response.status === 200) {
          console.log(response.data);
          localStorage.setItem('cassockPaymentWallet', JSON.stringify(response.data.wallet));
          navigate('/invest/payment');
        }
      } catch (error: any) {
        setErrorMessage('We are sorry, we cannot create new Investment portfolio at this time');
        setSubmitting(false);
        console.error(error);
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
            value={investmentData.amount}
            onChange={handleAmountChange}
            className=" custom-input bg-transparent form-control text-light"
          />
        </Form.Group>
        <br />
        <Form.Group className='mb-4' as={Col} lg="12" controlId="validationFormik04">
          <Form.Label className='mb-0'>Investment Manager{required}</Form.Label>
          <Select options={managers} onChange={(e: any) => {
            console.log(e)
            handleManagerChange(e)
          }} className=' bg-transparent form-control' />
        </Form.Group>


        {wallets && (
          <>
            <Form.Group className="mb-3" controlId="validationFormik04">
              <Form.Label>Currency {required}</Form.Label>
              <Form.Select onChange={(e) => handleCurrencyChange(e)} >
                <option value="">Choose...</option>
                {wallets.map((wallet, index) => (
                  <option key={wallet.id} value={wallet.currency}>
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
                    {wallet.blockchain}value={wallet.blockchain}
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
            value={investmentData.wallet.address}
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
