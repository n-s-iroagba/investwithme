import React, { useState } from 'react'
import { Form,Row,Col, Spinner } from 'react-bootstrap'
import { required } from '../auth/general/required'
import ConfirmationModal from '../investor/ConfirmationModal'
import ErrorMessage from '../general/ErrorMessage'
import { useNavigate } from 'react-router-dom'
import '../styles.css'


const NewInvestmentForm:React.FC = ()=>{
    const [submitting ,setSubmitting]= useState(false)
    const [showModal, setShowModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate();
    const handleShowModal = () => {
      setShowModal(true);
    };
  const username= 'Nnamdi'
    const handleCloseModal = () => {
      setShowModal(false);
    };
      const handleSelectChange = (event:any) => {
        const selectedValue = event.target.value
      };
    return(
      <>
      <h6 className='text-center w-100'>*{`${username}'s`} first portfolio*</h6>
        <Form className="form py-5" noValidate 
        //validated={validated}
        // onSubmit={(e) => handleSubmit(adminData, e, createAdminUrl,navigateToVerifyEmailPage)}
        >
      
          <Form.Group className='mb-4' as={Col} lg="12" controlId="validationFormik04">
            <Form.Label>Investment Amount (in USD) {required}</Form.Label>
            <Form.Control
              required
              type="number"
              name="amount"
              //value={adminData.name}
              //onChange={(e) => handleChange(adminData, e, setAdminData)}
              className=" custom-input bg-transparent form-control text-light"
            />
          </Form.Group>
          <br/>
  

          <Form.Group  className='mb-4' as={Col} lg="12" controlId="validationFormik04">
            <Form.Label className='mb-0'>Investment Manager{required}</Form.Label>
              <Form.Select aria-label="">
              <option className='primary-background text-light'>Open this select menu</option>
              <option className='primary-background text-light'value="1">One</option>
              <option className='primary-background text-light' value="2">Two</option>
              <option className='primary-background text-light' value="3">Three</option>
            </Form.Select>
          </Form.Group>
  
    
     <br/>
          <Form.Group className='mb-4' as={Col} lg="12" controlId="validationFormik04">
            <Form.Label>Blockchain for transactions {required}</Form.Label>
              <Form.Select aria-label="Default select example">
              <option>Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
            <Form.Control.Feedback></Form.Control.Feedback>
          </Form.Group>
   
    <br/>

     
          <Form.Group as={Col} lg="12" controlId="validationFormik04">
            <Form.Label>Wallet address{required}</Form.Label>
            <Form.Control
              required
              type="text"
              name="investmentName"
              //value={adminData.name}
              //onChange={(e) => handleChange(adminData, e, setAdminData)}
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
      <ConfirmationModal
      title = {`${username}`}
      acceptRoute = 'invest-payment'
      rejectRoute = 'invest-manager'
      message = 'edit me later'
      show={showModal} onClose={handleCloseModal} />
      </>
    )
}
export default NewInvestmentForm
    