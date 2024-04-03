import React from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Spinner} from'react-bootstrap';
import { useState } from 'react';
import '../styles.css';
import ErrorMessage from '../general/ErrorMessage';
import { required } from '../auth/general/required';

import { useNavigate } from 'react-router-dom';

import { ManagerType } from '../../utils/types';


const ManagerForm: React.FC<ManagerType> = () => {
 const [managerData,setManagerData] = useState({
  firstName:'',
  lastName:'',
  image:null,
  qualification:'',
  minimumInvestmentAmount:0,
  percentageYield:0

 }) 
 const [submitting,setSubmitting] = useState(false);
 const [errorMessage,setErrorMessage] = useState('');
 const navigate = useNavigate();

 const  navigateToHome=()=>{
  navigate('/')
 }

 const handleChange = (e:any) => {
  e.preventDefault();
  setManagerData({
    ...managerData,
    [e.target.name]: e.target.value,
  });
 }
 const handleFileChange = (e:any) => {
  e.preventDefault();
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onloadend = function() {
    setManagerData({
      ...managerData,
      [e.target.name]: reader.result
    });
  };

  reader.readAsDataURL(file);
};



 const handleSubmit = (e:any) => {
  e.preventDefault();
  console.log(managerData);
  setSubmitting(true)
 }
  return (

    <div className="d-flex justify-content-center align-content-center mt-5  px-2 ">
  
      <Form className='form py-5' noValidate onSubmit={(e: any) => handleSubmit(e)}>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="validationFormik01">
            <Form.Label className='mb-0'>First name{required}</Form.Label>
            <Form.Control
              required
              type="text"
              name="firstName"
              value={managerData.firstName}
              onChange={(e) => handleChange(e)} // Use (e)=>handleChange(managerData,e, setmanagerData) here
              className='text-light custom-input bg-transparent form-control'
            />
            <Form.Control.Feedback></Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col}  >
            <Form.Label className='mb-0'>Last name{required}</Form.Label>
            <Form.Control
              required
              type="text"
              name="lastName"
              value={managerData.lastName}
              onChange={(e) => handleChange(e)}
              className='text-light custom-input bg-transparent form-control'
            />
            <Form.Control.Feedback></Form.Control.Feedback>
          </Form.Group>
        </Row>
       
        <Form.Group className='mb-4' as={Col} controlId="validationFormik01">
          <Form.Label className='mb-0'>Qualification{required}</Form.Label>
          <Form.Control
            required
            type="text"
            name="qualification"
            value={managerData.qualification}
            onChange={(e) => handleChange(e)}
            className='text-light custom-input bg-transparent form-control'
          />
          <Form.Control.Feedback></Form.Control.Feedback>
        </Form.Group>


        <Form.Group className='mb-4' as={Col} lg="12" controlId="validationFormik04">
          <Form.Label className='mb-0'>Percentage Yield{required}</Form.Label>
            <Form.Control
              required
              type='number'
              name='percentageYield'
              value={managerData.percentageYield}
              onChange={(e) => handleChange(e)}
              className=" custom-input bg-transparent form-control text-light"
            />
        </Form.Group>
        <br />


        <Form.Group className='mb-4' as={Col} lg="12" controlId="validationFormik04">
          <Form.Label className='mb-0'>Minimum Investment Amount{required}</Form.Label>
            <Form.Control
              required
              type='number'
              name='minimumInvestmentAmount'
              value={managerData.minimumInvestmentAmount}
              onChange={(e) => handleChange(e)}
              className=" custom-input bg-transparent form-control text-light"
            />
        </Form.Group>
        <br />

 
       
        <Form.Group as={Col} sm = '12'className='mb-4' controlId="validationFormik05">
          <Form.Label className='mb-0'>Manager's picture</Form.Label>
          <Form.Control
            type="file"
            name="image"
            onChange={(e) => handleFileChange(e)}
            className=' custom-input text-light bg-transparent form-control'
          />
        </Form.Group>
  
        <br />
        <div className='d-flex justify-content-evenly w-100'>
          <button className='button-styles w-50 text-light' type={submitting  ? 'submit' : 'submit'}>
            {submitting ? <Spinner animation='border' size='sm' /> : 'Submit'}
          </button>
          <button className='button-styles text-light w-50' onClick={() => navigateToHome()}> Home</button>
        </div>
      </Form>
      <ErrorMessage message={errorMessage} />
    </div>

  );
}

export default ManagerForm;
