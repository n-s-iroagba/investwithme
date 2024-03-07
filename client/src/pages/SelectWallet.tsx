

import React, { useState }  from 'react';
import { useNavigate} from 'react-router-dom'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { InputGroup, Spinner } from 'react-bootstrap';
// import { required } from '../../components/forms/required';
// import '../../assets/Styles.css'


const  WAValidator = require('multicoin-address-validator');

const myfunc=()=>{
    
    var valid = WAValidator.validate('1KFzzGtDdnq5hrwxXGjwVnKzRbvf8WVxck', 'bitcoin');
    if(valid)
        alert('This is a valid address');
    else
        alert('Address INVALID');
}
const SelectWallet: React.FC = () => {
  const [validated, setValidated] = useState<boolean>(false)

  const navigate = useNavigate()
  return (
    <div className="d-flex justify-content-center align-items-center flex-column my-3">
   
{/* 
      <Form className="form py-5 " noValidate validated={validated} onSubmit={()=>console.log('hello')}>
        <Row>
          <Form.Group as={Col} lg="12" controlId="validationFormik04">
            <Form.Label className='mb-0'>Name{required}</Form.Label>
            <Form.Control
              required
              type="text"
              name="name"
              value={adminData.name}
              onChange={(e) => handleChange(adminData, e, setAdminData)}
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
              onChange={(e) => handleChange(adminData, e, setAdminData)}
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
              onChange={(e) => handlePasswordChange(adminData, e, setAdminData)}
              className=" custom-input bg-transparent form-control text-light"

            />
            <InputGroup.Text onClick={() => showPassword()}>
              <FontAwesomeIcon icon={passwordType === 'text' ? faEye : faEyeSlash} />
            </InputGroup.Text>
          </InputGroup>
          <PasswordStrengthMeter password={adminData.password} />
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
        <br/>

        <Form.Group as={Col} lg="12" controlId="validationFormik04">
          <Form.Label className='mb-0'>Confirm password{required}</Form.Label>
          <InputGroup>
            <Form.Control
              required
              type={passwordType}
              name="confirmPassword"
              value={adminData.confirmPassword}
              onChange={(e) => handleConfirmPasswordsChange(adminData, e, setAdminData)}
              className=" custom-input  bg-transparent form-control text-light "
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
            value={adminData.secretCode}
            onChange={(e) => handleChange(adminData, e, setAdminData)}
            className=" custom-input bg-transparent form-control text-light "
          />
        </Form.Group>
        <br />
        <div className='d-flex justify-content-evenly w-100'>
          <button className='button-styles w-50 text-light' type={submitting === 'submitting' ? 'button' : 'submit'}>
            {submitting === 'submitting' ? <Spinner animation='border' size='sm' /> : 'Submit'}
          </button>
          <button className='button-styles text-light w-50' onClick={() => navigateToHome()}> Home</button>
        </div>
      </Form>
      <ErrorMessage message={errorMessage} /> */}
    </div>

  );
};


export default SelectWallet