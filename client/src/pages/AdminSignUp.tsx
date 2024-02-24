import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { InputGroup } from 'react-bootstrap';
import { postData } from '../helpers/api';
import PasswordStrengthMeter from '../components/PasswordStrengthMeter'; // Make sure to import the PasswordStrengthMeter component
import {PasswordStrengthType } from '../components/PasswordStrengthMeter';
import {adminDomain } from '../helpers/data';
import { useNavigate } from 'react-router-dom';
import {setAuthTokenAndNavigate } from '../helpers/helpers';
import { required } from '../components/forms/required';
import '../assets/Styles.css'

const AdminSignUp: React.FC = () => {
  const [data, setData] = useState({
    name: '',
    password: '',
    confirmPassword: '',
    email: '',
  });
const navigate = useNavigate()

  const [showPasswordWarning,setShowPasswordWarning] = useState<string>('text-light')
  const [passwordType,setPasswordType] = useState<string>('text')
  const validatePasswordLength = (password: string) => {
    if (password.length < 8) {
     setShowPasswordWarning('text-danger')
    return undefined;
  };
  }
  const passwordsMatch = (password: string, confirmPassword: string) => {
    return password === confirmPassword;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, password, confirmPassword, email } = data;

    if (!passwordsMatch(password, confirmPassword)) {
      alert('Passwords do not match');
      return;
    }
    const responseStatus = await postData(adminDomain,data,navigate,'/admin-dashboard/xxx',setAuthTokenAndNavigate)
    if (responseStatus !== 200)
    {
        alert('error occured while trying to register admin')
    }
    
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.preventDefault();
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Container fluid className="d-flex justify-content-center align-content-center mt-5 mb-5">
      <Form className="form text-light d-flext justify-content-center align-content-center" noValidate onSubmit={handleSubmit}>
      <Row>
          <Form.Group as={Col} lg="12" controlId="validationFormik04">
            <Form.Label className='mb-0'>Name{required}</Form.Label>
            <Form.Control
              required
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
              className=" custom-input bg-transparent form-control text-light"
            />
            <Form.Control.Feedback></Form.Control.Feedback>
          </Form.Group>
        </Row>
        <br />
        <Row>
          <Form.Group as={Col} lg="12" controlId="validationFormik04">
            <Form.Label className='mb-0'>Email{required}</Form.Label>
            <Form.Control
              type="email"
              required
              name="email"
              value={data.email}
              onChange={handleChange}
              className=" custom-input bg-transparent form-control text-light"
            />
            <Form.Control.Feedback></Form.Control.Feedback>
          </Form.Group>
        </Row>
        <br />
        <Row >
          <Form.Group  className='mb-4' as={Col} lg="12" controlId="validationFormik04">
            <Form.Label className='mb-0'>Password{required}</Form.Label>
            <Form.Control
              type={passwordType}
              name='password'
              value={data.password}
              onChange={handleChange}
              className=" custom-input bg-transparent form-control text-light"
            />
            <PasswordStrengthMeter password={data.password}/>
            <Form.Text className={`${showPasswordWarning}  pt-0`}>*password must have least 8 characters</Form.Text>
               </Form.Group>

          <Form.Group  as={Col} lg="12" controlId="validationFormik04">
            <Form.Label className='mb-0'>Confirm Password{required}</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              name="confirmPassword"
              value={data.confirmPassword}
              onChange={handleChange}
              className=" custom-input bg-transparent form-control"
            />
          </Form.Group>
        </Row>
        <Form.Group as={Col} lg="12" controlId="validationFormik04">
            <Form.Label className='mb-0'>Secret code{required}</Form.Label>
            <Form.Control
              type="password"
              name="secretCode"
              value={data.secretCode}
              onChange={handleChange}
              className=" custom-input bg-transparent form-control text-light"
            />
          </Form.Group>
        
        <br />

        <Button type="submit">Submit form</Button>
      </Form>
    </Container>
  );
};

export default AdminSignUp;