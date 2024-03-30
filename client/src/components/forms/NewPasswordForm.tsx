import React, { useContext, useState } from 'react';
import { useNavigate} from 'react-router-dom'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import { InputGroup, Spinner } from 'react-bootstrap';
import { required } from '../../components/forms/required';
import '../../assets/Styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import ErrorMessage from '../../components/ErrorMessage';
import { loginUrl } from '../../helpers/data';
import { postData } from '../../helpers/api';
import PasswordStrengthMeter from '../PasswordStrengthMeter';
import { AuthContext } from '../../context/AuthContext';



const NewPasswordForm: React.FC = ()=>{
  const navigate = useNavigate()

  const [submitting, setSubmitting] = useState(false)
 const [validated,setValidated] = useState(false)
  const [data, setData] = useState({
    password: "",
    confirmPassword: "",
  })


  const {

    handleConfirmPasswordsChange,
    handlePasswordChange,
    passwordType,
    showPassword,
    isPasswordsMatch,
    errorMessage,
    setErrorMessage,
    passwordValidityMessage
  } = useContext<any>(AuthContext)//

 

   const login =()=>{
    setSubmitting(true);
    try{
    const response = postData(loginUrl,data)
    console.log(response)
    if (response.status === 403){
      localStorage.setItem('cassockEmailVerificationToken', JSON.stringify(response.data))
      navigate('/verify-email')
    }else if (response.status === 400){
      navigate('/signup')
    }else{
      localStorage.setItem('cassockAuthToken', JSON.stringify(response.data))
      navigate('/verify-email')
    }
   }catch(e){
      setErrorMessage('sorry you cannot login at this time, we are maintaining our servers due to heavy traffic')
      setSubmitting(false)
      console.error(e)
   }
  }

   const handleChange = (e:any)=>{
    setData({...data, [e.target.name]:e.target.value})

   }

 
    
  return (
    <div className="d-flex justify-content-center align-items-center flex-column my-3">
      <Form className="form py-5 " noValidate validated={validated} onSubmit={(e) => login()}>
    
      <Form.Group className='mb-4' as={Col} lg="12" controlId="validationFormik04">
          <Form.Label className='mb-0'>Password{required}</Form.Label>
          <InputGroup>
            <Form.Control
              required
              type={passwordType}
              name='password'
              value={data.password}
              onChange={(e) =>  handlePasswordChange(data, e, setData)}
              className=" custom-input bg-transparent form-control text-light"

            />
            <InputGroup.Text onClick={() => showPassword()}>
              <FontAwesomeIcon icon={passwordType === 'text' ? faEye : faEyeSlash} />
            </InputGroup.Text>
          </InputGroup>
          <PasswordStrengthMeter password={data.password} />
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
              value={data.confirmPassword}
              onChange={(e) =>handleConfirmPasswordsChange(data, e, setData)}
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
         <br/>
        <Form.Group>
        <div className='d-flex justify-content-evenly w-100 pb-5'>
          <button className='button-styles w-50 text-light' type={submitting ? 'button' : 'submit'}>
            {submitting ? <Spinner animation='border' size='sm' /> : 'Submit'}
          </button>
          <button className='button-styles text-light w-50' onClick={() => navigate('/login')}> Back to Login</button>
        </div>
        </Form.Group>
      </Form>
      <br/>

      <ErrorMessage message={errorMessage} />
    </div>

  );
};

export default NewPasswordForm;