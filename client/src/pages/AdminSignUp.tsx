import React, {useContext, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { InputGroup, Spinner } from 'react-bootstrap';
import { adminDomain } from '../helpers/data';
import { required } from '../components/forms/required';
import { validatePassword,} from '../helpers/helpers';
import PasswordStrengthMeter from '../components/PasswordStrengthMeter';
import '../assets/Styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import ErrorMessage from '../components/ErrorMessage';
import { AdminData, AuthContextType } from '../context/AuthTypes';
import { AuthContext } from '../context/AuthContext';


const AdminSignUp: React.FC = () => {
  const {submitting, adminData, validated,handleSubmit} = useContext<any>(AuthContext)

  const tempPasswordState: string[] = []

 

  

  return (
    <div className="d-flex justify-content-center align-items-center flex-column mt-5 mb-5">
      <div className={`${submitting}`}></div>
      <Form className="form " noValidate validated={validated} onSubmit={(e)=>handleSubmit()}>
        <Row>
          <Form.Group as={Col} lg="12" controlId="validationFormik04">
            <Form.Label className='mb-0'>Name{required}</Form.Label>
            <Form.Control
              required
              type="text"
              name="name"
              value={adminData.name}
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
              value={adminData.email}
              onChange={handleChange}
              className=" custom-input bg-transparent form-control text-light"
            />
            <Form.Control.Feedback></Form.Control.Feedback>
          </Form.Group>
        </Row>
        <br />

        <Form.Group className='mb-4' as={Col} lg="12" controlId="validationFormik04">
          <Form.Label className='mb-0'>Password{required}</Form.Label>
          <InputGroup>
            <Form.Control
              required
              type={passwordType}
              name='password'
              value={adminData.password}
              onChange={(e) => handlePasswordChange(e, tempPasswordState, validatePassword)}
              className=" custom-input bg-transparent form-control text-light"

            />
            <InputGroup.Text onClick={() => showPassword()}>
              <FontAwesomeIcon icon={passwordType === 'text' ? faEye : faEyeSlash} />
            </InputGroup.Text>
          </InputGroup>
          <PasswordStrengthMeter password={admindata.password} />
          <div className='d-flex flex-column'>
            {
              Array.isArray(passwordValidityMessage) && passwordValidityMessage.length > 0 && (
                passwordValidityMessage.map((message, index) => (
                  <Form.Text className='text-danger' key={index}>*{message}</Form.Text>
                ))
              )
            }
          </div>
        </Form.Group>

        <Form.Group as={Col} lg="12" controlId="validationFormik04">
          <Form.Label className='mb-0'>Confirm password{required}</Form.Label>
          <InputGroup>
            <Form.Control
              required
              type={passwordType}
              name="confirmPassword"
              value={adminData.confirmPassword}
              onChange={(e) => handleConfirmPasswordsChange(e, passwordsMatch)}
              className=" custom-input text-light bg-transparent form-control"
            />
            <InputGroup.Text onClick={() => showPassword()}>
              <FontAwesomeIcon icon={passwordType === 'text' ? faEye : faEyeSlash} />
            </InputGroup.Text>
          </InputGroup>
          <div>
            {
              !isPasswordsMatch && <Form.Text className='text-danger'>*passwords do not match</Form.Text>
            }
          </div>
        </Form.Group>

        <Form.Group className='mt-4' as={Col} lg="12" controlId="validationFormik04">
          <Form.Label className='mb-0'>Secret code{required}</Form.Label>
          <Form.Control
            required
            type="password"
            name="secretCode"
            value={admindata.secretCode}
            onChange={handleChange}
            className=" custom-input bg-transparent form-control text-light"
          />
        </Form.Group>
        <br />
        <div className='d-flex justify-content-evenly'>
          <button className='button-styles button-width-narrower text-light' type={submitting === 'submitting' ? 'button' : 'submit'}>
            {submitting === 'submitting' ? <Spinner animation='border' size='sm' /> : 'Submit'}
          </button>
          <button className='button-styles button-width-narrower text-light' onClick={() => navigate('/')}> Home</button>
        </div>
      </Form>
      <ErrorMessage message={errorMessage} />
    </div>

  );
};

export default AdminSignUp;