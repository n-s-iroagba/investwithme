import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import {  Spinner } from 'react-bootstrap';
import { required } from './required';
import '../../styles.css'
import ErrorMessage from '../../general/ErrorMessage';



const ChangePasswordEmailForm: React.FC = () => {
const [validated, setValidated] = useState<boolean>(false)
const [submitting, setSubmiting] = useState<boolean>(false)
const [email, setEmail] = useState<string>('')
const [errorMessage,setErrorMessage] = useState<string>('')
  const navigate = useNavigate()


const navigateToLogin=()=>{
      navigate('/login')
    }
const handleSubmit = ()=>{
  setValidated(false)
  setSubmiting(true)
  setErrorMessage('sorry we cannot proceed with your request at this time')
}
const handleChange = (e:any)=>{
  setEmail(e.target.value)
}
    
  return (
    <div className="d-flex justify-content-center align-items-center flex-column my-3">
      <Form className="form py-5 " noValidate validated={validated} onSubmit={handleSubmit}>       
        <Row>
          <Form.Group as={Col} lg="12" controlId="validationFormik04">
            <Form.Label className='mb-0'>Email{required}</Form.Label>
            <Form.Control
              type="email"
              required
              name="email"
              value={email}
              onChange={handleChange}
              className=" custom-input bg-transparent form-control text-light"
            />
            <Form.Control.Feedback></Form.Control.Feedback>
          </Form.Group>
        </Row>
        <br />       
        <Form.Group>
        <div className='d-flex justify-content-evenly w-100 pb-5'>
          <button className='button-styles w-50 text-light' type={submitting ? 'button' : 'submit'}>
            {submitting ? <Spinner animation='border' size='sm' /> : 'Submit'}
          </button>
          <button className='button-styles text-light w-50' onClick={() => navigateToLogin()}> Back to Login</button>
        </div>
        </Form.Group>
      </Form>
      <br/>

      <ErrorMessage message={errorMessage} />
    </div>

  );
};

export default ChangePasswordEmailForm;