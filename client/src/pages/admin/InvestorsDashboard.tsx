import React, { useEffect, useState } from 'react'
import SuccessModal from '../../components/general/SuccessModal'
import { MiniFooter } from '../../components/home_components/Footer'
import '../../components/styles.css'

import { Modal, Form, Button } from 'react-bootstrap';

interface ModalFormProps {
    show: boolean;
  }
  
const AddInvestmentModalForm: React.FC<ModalFormProps> = ({ show }) => {
    const [formData, setFormData] = useState({
      amount: '',
      walletAddress: '',
      currency: '',
    });
    const [modalShow, setModalShow] = useState<boolean>(show)
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      // Add your form submission logic here
      console.log(formData);
      // Reset form data after submission (optional)
      setFormData({ amount: '', walletAddress: '', currency: '' });
    }
    const handleClose = () =>{setModalShow(false);
    window.location.reload()
    }
  useEffect(()=>{
    setModalShow(show)
  },[setModalShow,show]) 
  
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
              value={formData.walletAddress}
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
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              {/* Add more options as needed */}
            </Form.Control>
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

const InvestorsDashboard = ()=>{
    const [addInvestementShow,setAddInvestmentShow] = useState<boolean>(false)
    const [addPromoShow,setAddPromoShow] = useState<boolean>(false)
    const [addReferralShow,setAddReferralShow] = useState<boolean>(false)
    const handleInvestmentShow = ()=>{

        setAddInvestmentShow(true)
       
    }
    return(
        <div className='primary-background full-height'>
            
        <div className='col-lg-4 col-md-8 col-xs-12 d-flex flex-column align-items-center w-100 pt-5 text-light '>
            <SuccessModal message={''} propShow={true}/>
            <h1>Investors Dashboard</h1>
            <button className="text-light mb-2 button-styles button-width-narrow mt-4 border-0 border-bottom " onClick={()=>handleInvestmentShow()}> Add investor Amount</button>
            <button className="text-light mb-2 button-styles button-width-narrow mt-4 border-0 border-bottom " onClick={()=> console.log(addInvestementShow)}> Pay Promo Bonus</button>
            <button className="text-light mb-2 button-styles button-width-narrow mt-4 border-0 border-bottom "> Pay Referral Bonus</button>
            <button className="text-light mb-2 button-styles button-width-narrow mt-4 border-0 border-bottom "> View Investors</button>
        </div>
        <MiniFooter primaryVariant/>

        <AddInvestmentModalForm show={addInvestementShow}/>
        </div>
    )
}
export default InvestorsDashboard