import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import DatePicker from "react-datepicker";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Select from 'react-select';
import {useEffect, useState } from 'react';
import'../../assets/Styles.css';
import "react-datepicker/dist/react-datepicker.css"
import PasswordStrengthMeter from '../PasswordStrengthMeter';
import { required } from './required';






function SignUpForm() {

  const [showPopup, setShowPopup] = useState(false);
  const [validated, setValidated] = useState(false);
  const [startDate, setStartDate] = useState(new Date())
  const [strength,setStrength] = useState('')
  const [data, setData] = useState({
    firstName:'',
    lastName:'',
    username:'',
    password:'',
    email:'',
    gender:'',
    bank:'',
    confirmPassword:''
  })
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState({});

  useEffect(() => {
    fetch(
      "https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log('countries'+ data)
        setCountries(data.countries);
        setSelectedCountry(data.userSelectValue);
      });
  }, []);

  const validatePasswordLength = (password: string) => {
    if (password.length < 8) {
      return 'Password must be at least 8 characters';
    }
    return undefined;
  };



  const handleSubmit = (event:any) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const handlePopupClick = () => {
    // Close the popup when the user clicks to continue
    setShowPopup(false);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.preventDefault()
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  
  return (
 
      <div className="d-flex justify-content-center align-content-center mt-5 mb- px-2 ">
            <Form className='form ' noValidate validated={validated} onSubmit={handleSubmit}>

              <Row className="mb-3">
                <Form.Group as={Col}  controlId="validationFormik01">
                  <Form.Label className='mb-0'>First name{required}</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="firstName"
                    value={data.firstName}
                    onChange={handleChange} // Use handleChange here
                    className='text-light custom-input bg-transparent form-control'
                  />
                  <Form.Control.Feedback></Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col}  >
                  <Form.Label  className='mb-0'>Last name{required}</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="lastName"
                    value={data.lastName}
                    onChange={handleChange}
                    className='text-light custom-input bg-transparent form-control'
                  />
                  <Form.Control.Feedback></Form.Control.Feedback>
                </Form.Group> 
              </Row>
              <Form.Group className='bg-primary mb-3 d-flex justify-content-between align-items-start' controlId="validationFormik04">
                  <Form.Label>Date of birth{required}</Form.Label>
                  <DatePicker className='bg-transparent text-light date-input' selected={startDate} onChange={(date:any) => setStartDate(date)} />
                </Form.Group>
                <Form.Group className='mb-3' controlId="validationFormik04">
                  <Form.Label>Gender{required}</Form.Label>
                  <Select options={['male','female','prefer not to say']} className=' bg-transparent form-control'/>
                </Form.Group>
                <Form.Group className='mb-3' controlId="validationFormik04">
                  <Form.Label>Country of residence{required}</Form.Label>
                  <Select options={countries} className=' bg-transparent form-control'/>
                </Form.Group>
          
                <Form.Group className='mb-4'  as={Col}  controlId="validationFormik01">
                  <Form.Label className='mb-0'>Email{required}</Form.Label>
                  <Form.Control
                    required
                    type="email"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    className='text-light custom-input bg-transparent form-control'
                  />
                  <Form.Control.Feedback></Form.Control.Feedback>
                </Form.Group>

             
                <Form.Group className='mb-4'  >
                  <Form.Label  className='mb-0'>Password{required}</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                    className='text-light custom-input bg-transparent form-control'
                  /> 
                  <PasswordStrengthMeter password={data.password}/>
                  <Form.Control.Feedback></Form.Control.Feedback>
                </Form.Group> 

                <Form.Group className='mb-4' as={Col}  >
                  <Form.Label  className='mb-0'>Confirm password{required}</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="lastName"
                    value={data.confirmPassword}
                    onChange={handleChange}
                    className='text-light custom-input bg-transparent form-control'
                  />
                  <Form.Control.Feedback></Form.Control.Feedback>
                </Form.Group> 
             
                <Form.Group className='mb-4' controlId="validationFormik05">
                  <Form.Label className='mb-0'>Bank name{required}</Form.Label>
                  <Form.Control
                  required
                    type="text"
                    name="bank"
                    value={data.bank}
                    onChange={handleChange}
                    className=' custom-input bg-transparent form-control'
                  />
                  <Form.Text className='text-light'>This is needed to process your payment when due.</Form.Text>
                  <Form.Control.Feedback></Form.Control.Feedback>
                </Form.Group>
      
              <Button type="submit">Submit form</Button>
            </Form>
      </div>
    //   <button>click</button>
    //   {showPopup && (
    //     <div className="popup">
    //       <p>This is a custom popup. Click to continue.</p>
    //       <button onClick={handlePopupClick}>Continue</button>
    //     </div>
    //   )}
    // </div>
  );
}

export default SignUpForm;
