import React, { useContext } from 'react';
import { useNavigate} from 'react-router-dom'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { InputGroup, Spinner } from 'react-bootstrap';
import { createAdminUrl } from '../../helpers/data';
import { required } from '../../components/forms/required';
import PasswordStrengthMeter from '../../components/PasswordStrengthMeter';
import '../../assets/Styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import ErrorMessage from '../../components/ErrorMessage';
import { AuthContext } from '../../context/AuthContext';



const ChangePasswordEmailForm: React.FC = () => {

  const navigate = useNavigate()

  const {
    submitting,
    adminData,
    validated,
    setAdminData,
    handleSubmit,
    handleChange,
    handleConfirmPasswordsChange,
    handlePasswordChange,
    passwordType,
    showPassword,
    isPasswordsMatch,
    errorMessage,
    passwordValidityMessage
  } = useContext<any>(AuthContext)// used 'any' type because code was buggy when using <AuthContextType|undefined>
 
 const navigateToVerifyEmailPage=()=>{
      navigate('/verify-email')
    }
const navigateToLogin=()=>{
      navigate('/login')
    }
    
  return (
    <div className="d-flex justify-content-center align-items-center flex-column my-3">
      <Form className="form py-5 " noValidate validated={validated} onSubmit={(e) => handleSubmit(adminData, e, createAdminUrl,navigateToVerifyEmailPage)}>       
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
        <Form.Group>
        <div className='d-flex justify-content-evenly w-100 pb-5'>
          <button className='button-styles w-50 text-light' type={submitting === 'submitting' ? 'button' : 'submit'}>
            {submitting === 'submitting' ? <Spinner animation='border' size='sm' /> : 'Submit'}
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