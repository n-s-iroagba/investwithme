import React, { useEffect, useState } from 'react'
import { Form,Col, Spinner } from 'react-bootstrap'
import { required } from '../auth/general/required'
import ErrorMessage from '../general/ErrorMessage'
import { useNavigate } from 'react-router-dom'
import '../styles.css'
import { CreateInvestmentType, ManagerType, WalletType,InvestmentEntryType } from '../../utils/types'

import {findManagerWithHighestMinInvestment,findManagerById, createInvestment } from '../../utils/helpers'
import Select from 'react-select';
const  WAValidator = require('multicoin-address-validator')


const NewInvestmentForm:React.FC<{username:string,investorId:number}> = ({username,investorId})=>{
    const [submitting ,setSubmitting]= useState(false)

    const [wallets, setWallets] = useState<WalletType[]>([]);
    const [walletVerified, setWalletVerified] = useState<boolean>(true)
    const [ filteredCurrencywallets, setFilteredCurrencyWallets] = useState<WalletType[]>([]);
    const [filteredBlockchainWallets, setFilteredBlockchainWallets] = useState<WalletType[]>([]);
    const [filteredNetworkWallets, setFilteredNetworWallets] = useState<WalletType[]>([]);
    const [validated, setValidated] = useState<boolean>(false);
    const [smallAmount, setSmallAmount] = useState<boolean>(false);
    const [tooBigManager,setTooBigManager] = useState<boolean>(false);
    const dummyManager =  {
      id: 0,
      firstName: '',
      lastName: '',
      minimumInvestmentAmount: 0,
      percentageYield: 0,
      duration: 0,
      image: null,
      qualification: ''
    }
    const [investmentData,setInvestmentData] = useState< CreateInvestmentType>({
        amount: 0,
        wallet: {
        network: '',
        address:'',
        currency: '',
        blockchain:''
    },
        manager: dummyManager
      
    });
    const [managers,setManagers] = useState<ManagerType[]>([])
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate();
  const managerId = localStorage.getItem('cassockInvestmentManagerId');

  
    useEffect(() =>{
 
      const wallet1: WalletType = {
        blockchain: 'Ethereum',
        address: '0x1234567890abcdef',
        network: 'Mainnet',
        currency: 'ETH',
      };
      
      const wallet2: WalletType = {
        blockchain: 'Bitcoin',
        address: 'bc1q2w3e4r5t6y7u8i9o0p',
        network: 'Testnet',
        currency: 'BTC',
      };
      
      const wallet3: WalletType = {
        blockchain: 'Binance Smart Chain',
        address: '0xa1b2c3d4e5f6g7h8i9j0k',
        network: 'Testnet',
        currency: 'BNB',
      };
      
      const manager1: ManagerType = {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        minimumInvestmentAmount: 1000,
        percentageYield: 5,
        duration: 12,
        image: 'path/to/image1.jpg',
        qualification: 'Certified Financial Analyst',
      };
      
      const manager2: ManagerType = {
        id: 2,
        firstName: 'Jane',
        lastName: 'Smith',
        minimumInvestmentAmount: 500,
        percentageYield: 7,
        duration: 18,
        image: 'path/to/image2.jpg',
        qualification: 'Chartered Accountant',
      };
      
      const manager3: ManagerType = {
        id: 3,
        firstName: 'Alice',
        lastName: 'Johnson',
        minimumInvestmentAmount: 2000,
        percentageYield: 6,
        duration: 24,
        image: 'path/to/image3.jpg',
        qualification: 'Financial Planner',
      };
      
   
      const data:InvestmentEntryType = 
        {
          managers: [manager1, manager2, manager3],
          wallets: [wallet1, wallet2, wallet3],
        }
      
    if(data){
      const manager = findManagerById(data.managers,Number(managerId))
      if(manager){
        setInvestmentData({...investmentData,manager:manager})
      }
      setManagers(data.managers)
   
      setWallets(data.wallets)
    }
    }, [investmentData, managerId])


  
      const handleAmountChange = (e:any) => {
      const manager = findManagerWithHighestMinInvestment(managers, e.target.value)
      if (manager){
        setInvestmentData({
          ...investmentData,
          amount: e.target.value,
          manager: manager
        });
        setSmallAmount(false)
      }else{
        setInvestmentData({
          ...investmentData,
          manager: dummyManager
        });
        setSmallAmount(true)
      }
    }
    const handleManagerChange = (e:any) => {
      const manager = e.label
      if (investmentData.amount<manager.minimumAmount) {
        setTooBigManager(true)
    }else{
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
    
      const handleNetworkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setInvestmentData(prevData => ({
          ...prevData,
          wallet: {
            ...prevData.wallet,
            network: value
          }
        }));
        const newfilteredWallets = filteredBlockchainWallets.filter(wallet => wallet.blockchain === e.target.value);
        setFilteredNetworWallets(newfilteredWallets);
      };

      const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setWalletVerified(verifyAddress(value))
        if (walletVerified){
        setInvestmentData(prevData => ({
          ...prevData,
          wallet: {
            ...prevData.wallet,
            address: value
          }
        }));
      }
    }

      const verifyAddress = (address:any) =>{
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
            const response = await createInvestment(investmentData, Number(investorId));
            if (response && response.status === 200) {
              console.log(response.data);
              localStorage.setItem('cassockPaymentWallet', JSON.stringify(response.data.wallet));
              navigate('/investment/payment');
            }
          } catch (error: any) {
            setErrorMessage('We are sorry, we cannot create new Investment portfolio at this time');
            setSubmitting(false);
            console.error(error);
          }
        }
      };


    return(
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
          <br/>
          <Form.Group  className='mb-4' as={Col} lg="12" controlId="validationFormik04">
            <Form.Label className='mb-0'>Investment Manager{required}</Form.Label>
          <Select options={managers} onChange={(e: any) => {
            console.log(e)
            handleManagerChange(e)
          }} className=' bg-transparent form-control' />
        </Form.Group>
         
        <br/>
          <Form.Group className='mb-4' as={Col} lg="12" controlId="validationFormik04">
            <Form.Label>Deposit Crypto Currency {required}</Form.Label>
            <Select options={wallets} onChange={(e: any) => {
            console.log(e)
            handleCurrencyChange(e)
          }} className=' bg-transparent form-control' />
            <Form.Control.Feedback></Form.Control.Feedback>
          </Form.Group>
    <br/>
    
     <br/>
          <Form.Group className='mb-4' as={Col} lg="12" controlId="validationFormik04">
            <Form.Label>Blockchain for transactions {required}</Form.Label>
            <Select options={filteredBlockchainWallets} onChange={(e: any) => {
            console.log(e)
            handleBlockchainChange(e)
          }} className=' bg-transparent form-control' />
            <Form.Control.Feedback></Form.Control.Feedback>
          </Form.Group>
    <br/>
     
    <br/>
          <Form.Group className='mb-4' as={Col} lg="12" controlId="validationFormik04">
            <Form.Label>Network {required}</Form.Label>
            <Select options={filteredNetworkWallets} onChange={(e: any) => {
            console.log(e)
            handleNetworkChange(e)
          }} className=' bg-transparent form-control' />
            <Form.Control.Feedback></Form.Control.Feedback>
          </Form.Group>
   
    <br/>
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
   
        <br/>

        <div className='d-flex justify-content-evenly w-100'>
          <button className='button-styles w-50 text-light' type={submitting  ? 'submit' : 'submit'}>
            {submitting ? <Spinner animation='border' size='sm' /> : 'Submit'}
          </button>
          <button className='button-styles text-light w-50' onClick={() => navigate('/dashboard')}> Back to Dashboard</button>
        </div>
      </Form>
      <ErrorMessage message={errorMessage} />
      
      </>
    )
}
export default NewInvestmentForm
    