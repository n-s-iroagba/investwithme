import React, { useEffect, useState } from 'react'
import SuccessModal from '../../components/general/SuccessModal'
import { MiniFooter } from '../../components/home_components/Footer'
import '../../components/styles.css'
import CryptoConvert from 'crypto-convert';
import { Modal, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { faCircleDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { addInvestment, getCurrencies, getInvestmentNewbies } from '../../utils/helpers';
import { AddInvestmentType } from '../../utils/types';

interface ModalFormProps {
  show: boolean;
}

const AddInvestmentModalForm: React.FC<ModalFormProps> = ({ show }) => {
  const [formData, setFormData] = useState<AddInvestmentType>({
    amount: 0,
    address: '',
    currency: '',
  });
  const [modalShow, setModalShow] = useState<boolean>(false)
  const [currencies, setCurrencies] = useState<string[]>([])


  useEffect(() => {
    setModalShow(show);
    const currencyResponse = getCurrencies();
    setCurrencies(currencyResponse);
  }, [show]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClose = () => {
    setModalShow(false);
    window.location.reload()
  }

  const handleConfirm = () => {
    localStorage.setItem('cassockCreditedState', 'true')
   
  };

  const handleSubmit =async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try{
 
     await addInvestment(formData)
    handleConfirm()
 
  }catch(error:any){
    console.error(error)
    alert('sorry, the amount was not added, contact')
  }finally{
    handleClose()
  }
  }
  


  return (

    <Modal
      show={modalShow}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>

        <Modal.Title>Add New Entry</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formAmount">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter amount"
              name="amount"
              value={formData.amount}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
            />
          </Form.Group>

          <Form.Group controlId="formWalletAddress">
            <Form.Label>Wallet Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter wallet address"
              name="walletAddress"
              value={formData.address}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
            />
          </Form.Group>

          <Form.Group controlId="formCurrency">
            <Form.Label>Currency</Form.Label>
            <Form.Control
              as="select"
              name="currency"
              value={formData.currency}
            >
              <option value="">Select currency</option>
              {currencies.map((currency) => (
                <option key={currency} value={currency}>{currency}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <br />
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

const InvestorsDashboard = () => {
  const [addInvestementShow, setAddInvestmentShow] = useState<boolean>(false)
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false)
  const [newbies, setNewbies] = useState<string[]>([])
  const navigate = useNavigate()
  useEffect(() => {
    const creditedState = localStorage.getItem('cassockCreditedState')
    if (creditedState) {
      setShowSuccessModal(true)
    }
    const investmentNewbies: string[] = getInvestmentNewbies()
    console.log(investmentNewbies)
    setNewbies(investmentNewbies)
  }, [])
  const handleInvestmentShow = () => {

    setAddInvestmentShow(true)

  }
  return (
    <div className='primary-background full-height'>

      <div className='col-lg-4 col-md-8 col-xs-12 d-flex flex-column align-items-center w-100 pt-5 text-light '>
        <SuccessModal message={''} propShow={showSuccessModal} />
        <h1>Investors Dashboard</h1>
        <button className="text-light mb-2 button-styles button-width-narrow mt-4 border-0 border-bottom " onClick={() => handleInvestmentShow()}> Add investor Amount</button>
        {
          newbies.includes('promo') ?
            <button className="notification-wrapper text-light mb-2 button-styles button-width-narrow mt-4 border-0 border-bottom " onClick={() => navigate('/admin/bonus')}> Pay Promo Bonus
              <FontAwesomeIcon className='notification text-danger' icon={faCircleDot} beat /></button>
            :
            <button className="text-light mb-2 button-styles button-width-narrow mt-4 border-0 border-bottom " onClick={() => navigate('/admin/bonus')}> Pay Promo Bonus</button>
        }

        {
          newbies.includes('referral') ?
            <button className="notification-wrapper text-light mb-2 button-styles button-width-narrow mt-4 border-0 border-bottom " onClick={() => navigate('/admin/referrals')}> Pay Referral Bonus
              <FontAwesomeIcon className='notification text-danger' icon={faCircleDot} beat />
            </button>
            :
            <button className="text-light mb-2 button-styles button-width-narrow mt-4 border-0 border-bottom " onClick={() => navigate('/admin/referrals')}> Pay Referral Bonus</button>
        }

        <button className="text-light mb-2 button-styles button-width-narrow mt-4 border-0 border-bottom " onClick={() => navigate('/admin/investors')}> View Investors</button>
      </div>
      <MiniFooter primaryVariant />
      <AddInvestmentModalForm show={addInvestementShow} />
    </div>
  )
}
export default InvestorsDashboard