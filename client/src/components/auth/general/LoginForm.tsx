import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { InputGroup, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import ErrorMessage from '../../general/ErrorMessage';
import { loginUrl } from '../../../utils/constants';
import { postData } from '../../../utils/api';
import { extractErrorCode } from '../../../utils/utils';
import { LoginOption } from './AuthOption';

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [data, setData] = useState({ email: '', password: '' });
  const [passwordType, setPasswordType] = useState('password');

  const showPassword = () => {
    setPasswordType(passwordType === 'password' ? 'text' : 'password');
  };

  const login = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    
    if (form.checkValidity() === false) {
      setErrorMessage('Please fill in all fields.');
      event.stopPropagation();
      return;
    }
  
    setValidated(true);
    setSubmitted(true);
  
    try {
      const response = await postData(loginUrl, data);
      handleLoginResponse(response);
    } catch (error) {
      handleLoginError(error);
    } finally {
      setSubmitted(false);
    }
  };
const handleLoginResponse = (response:any) => {
    setSubmitted(false);
    console.log('RESPONSE', response.status);
  
    if (response.status === 201) {
      localStorage.setItem('cassockEmailVerificationToken', JSON.stringify(response.data));
      navigate('/verify-email');
    } else if (response.status === 200) {
      handleSuccessfulLogin(response.data);
    }
  };

  const handleSuccessfulLogin = (data:any) => {
    localStorage.setItem('cassockJwtToken', JSON.stringify(data.token));
    const destination = data.user === 'investor' ? '/dashboard' : '/admin/dashboard';
    navigate(destination);
  };
  
  const handleLoginError = (error:any) => {
    console.error(error);
    const code = extractErrorCode(error.message);
    
    if (code === 403) {
      setErrorMessage('Invalid password.');
    } else if (code === 404) {
      setErrorMessage('You are not yet registered on our platform.');
    } else {
      setErrorMessage('Our server is currently down. Please try again later.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  return (
    <div className="d-flex justify-content-center align-items-center flex-column mt-2">
      <Form className="form py-2" noValidate validated={validated} onSubmit={(e) => login(e)}>
        <Row>
          <Form.Group as={Col} lg="12" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              required
              name="email"
              value={data.email}
              onChange={handleChange}
              className="custom-input bg-transparent form-control text-light"
            />
            <Form.Control.Feedback type="invalid">Please enter a valid email.</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} lg="12" controlId="password">
            <Form.Label>Password</Form.Label>
            <InputGroup>
              <Form.Control
                type={passwordType}
                required
                name="password"
                value={data.password}
                onChange={handleChange}
                className="custom-input bg-transparent form-control text-light"
              />
              <InputGroup.Text onClick={showPassword}>
                <FontAwesomeIcon icon={passwordType === 'text' ? faEye : faEyeSlash} />
              </InputGroup.Text>
            </InputGroup>
            <Form.Control.Feedback type="invalid">Please enter your password.</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <div className='d-flex justify-content-evenly w-100 pt-3'>
          <button className='button-styles w-50 text-light' type={submitted ? 'button' : 'submit'}>
            {submitted ? <Spinner animation='border' size='sm' /> : 'Submit'}
          </button>
          <button className='button-styles text-light w-50' onClick={() => navigate('/')}> Home</button>
        </div>
        <LoginOption
            title='Forgot password?'
            buttonText='Forgot password'
             route='forgot-password'
             dontShowLogo={true} />
      </Form>
      <ErrorMessage message={errorMessage} />
    </div>
  );
};

export default LoginForm;
