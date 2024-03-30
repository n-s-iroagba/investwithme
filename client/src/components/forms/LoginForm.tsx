import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { InputGroup, Spinner } from 'react-bootstrap';
import { required } from '../../components/forms/required';
import '../../assets/Styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import ErrorMessage from '../../components/ErrorMessage';
import { loginUrl } from '../../helpers/data';
import { postData } from '../../helpers/api';



const LoginForm: React.FC = ()=>{
  const navigate = useNavigate()
  const [validated, setValidated]= useState(true)
  const [submitted, setSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const [data,setData] = useState({
    email:"",password:""
  })
  const [passwordType,setPasswordType] = useState('password')

  const showPassword = () =>{
    if (passwordType === 'password') {
      setPasswordType('text')
    } else {
      setPasswordType('password')
    }
  }
   const login =()=>{
    setSubmitted(true);
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
      setSubmitted(false)
      console.error(e)
   }
  }

   const handleChange = (e:any)=>{
    setData({...data, [e.target.name]:e.target.value})

   }
    
  return (
    <div className="d-flex justify-content-center align-items-center flex-column mt-2">
      <Form className="form py-5 " noValidate validated={validated} onSubmit={(e) => login()}>
        

        <Row>
          <Form.Group as={Col} lg="12" controlId="validationFormik04">
            <Form.Label className='mb-0'>Email{required}</Form.Label>
            <Form.Control
              type="email"
              required
              name="email"
              value={data.email}
              onChange={(e) => handleChange(e)}
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
              name='password'
              value={data.password}
              onChange={(e) => handleChange(e)}
              className=" custom-input bg-transparent form-control text-light"

            />
            <InputGroup.Text onClick={() => showPassword()}>
              <FontAwesomeIcon icon={passwordType === 'text' ? faEye : faEyeSlash} />
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>
        <br/>

        <Form.Group>
        <div className='d-flex justify-content-evenly w-100 pb-5'>
          <button className='button-styles w-50 text-light' type={submitted ? 'button' : 'submit'}>
            {submitted ? <Spinner animation='border' size='sm' /> : 'Submit'}
          </button>
          <button className='button-styles text-light w-50' onClick={() => navigate('/')}> Home</button>
        </div>
        </Form.Group>
      </Form>
      <br/>

      <ErrorMessage message={errorMessage} />
    </div>

  );
};

export default LoginForm;