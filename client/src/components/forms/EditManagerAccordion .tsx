import React, { useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Spinner,Accordion,Image, Card, Button } from'react-bootstrap';
import { useState } from 'react';
import '../../assets/Styles.css';
import ErrorMessage from '../ErrorMessage';
import { required } from './required';

import { useNavigate } from 'react-router-dom';
import { patchManagerUrl } from '../../helpers/data';
import { ManagerType } from '../../helpers/types';


const EditManagerAccordion: React.FC<{manager:ManagerType}> = ({manager}) => {
 const [managerData,setManagerData] = useState<ManagerType>(manager) 
 const [submitting,setSubmitting] = useState(false);
 const [errorMessage,setErrorMessage] = useState('');
 const [isEditable,setIsEditable] = useState<boolean>(false);
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
const handleToggle = ()=>{
  setIsEditable(!isEditable)
}
 const handleSubmit = (e:any) => {
  e.preventDefault();
  console.log(managerData);
  setSubmitting(true)
 }
  return (

    <div className="d-flex add justify-content-center align-content-center mt-5  px-2 ">
       <Accordion className='w-100' defaultActiveKey="0">
      {<Accordion.Item eventKey="0">
        <Accordion.Header> 
          <Row className='w-100 pt-3'>  
          <Col  xs={3} >
            <Image src={managerData.image} alt="Card Image" roundedCircle  className='rounded-image-size' />
          </Col>
          <Col xs={6} >
            <Card.Title className='d-flex justify-content-evenly'><span>{managerData.firstName} </span><span>{managerData.lastName}</span></Card.Title>
          </Col>
          
        </Row></Accordion.Header>
        <Accordion.Body>
      <Form className='form py-5' noValidate onSubmit={(e: any) => handleSubmit(e)}>
      <div className='w-100 d-flex justify-content-center mb-4'>{isEditable?<Button>Save</Button>:<Button onClick={handleToggle}>Edit</Button>}</div>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="validationFormik01">
            <Form.Label className='mb-0'>First name{required}</Form.Label>
            <Form.Control
              required
              type="text"
              name="firstName"
              readOnly={!isEditable}
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
              readOnly={!isEditable}
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
            readOnly={!isEditable}
            value={managerData.qualification}
            onChange={(e) => handleChange(e)}
            className='text-light custom-input bg-transparent form-control'
          />
          <Form.Control.Feedback></Form.Control.Feedback>
        </Form.Group>
        
      <Row>
        <Form.Group className='mb-4' as={Col} lg="6" controlId="validationFormik04">
          <Form.Label className='mb-0'>Percentage Yield{required}</Form.Label>
            <Form.Control
              required
              type='number'
              name='percentageYield'
              readOnly={!isEditable}
              value={managerData.percentageYield}
              onChange={(e) => handleChange(e)}
              className=" custom-input bg-transparent form-control text-light"
            />
        </Form.Group>
        <br />


        <Form.Group className='mb-4' as={Col} lg="6" controlId="validationFormik04">
          <Form.Label className='mb-0'>Minimum Investment Amount{required}</Form.Label>
            <Form.Control
              required
              type='number'
              name='minimumInvestmentAmount'
              readOnly={!isEditable}
              value={managerData.minimumInvestmentAmount}
              onChange={(e) => handleChange(e)}
              className=" custom-input bg-transparent form-control text-light"
            />
        </Form.Group>
        </Row>
        <br />

 
       
        <Form.Group as={Col} sm = '12'className='mb-4' controlId="validationFormik05">
          <Form.Label className='mb-0'>Manager's picture</Form.Label>
          <Form.Control
            type="file"
            name="image"
            readOnly={!isEditable}
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
        <button>delete</button>
      </Form>
      <ErrorMessage message={errorMessage} />
      </Accordion.Body>
      </Accordion.Item>
      }
      </Accordion>
    </div>

  );
}

export default EditManagerAccordion;
