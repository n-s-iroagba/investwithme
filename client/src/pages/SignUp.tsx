import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container'; // Added Container import
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { useEffect, useState } from 'react';



type PasswordStrengthType = 'weak' | 'fairly-strong' | 'strong'|'';

const PasswordStrengthMeter: React.FC<{ password: string }> = ({ password }) => {
  const [strength, setStrength] = useState<PasswordStrengthType>('');
useEffect(()=>{
  const calculateStrength = () => {
    if (!password) {
      setStrength('');
      return;
    }else{
      console.log(password)
    }

    const hasNumber = /\d/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const length = password.length;

    if (length < 4 && length>1) {
      setStrength('weak');
    } else if (length>4 && length < 8) {
      setStrength('fairly-strong');
    } else if (!hasNumber || !hasUppercase || !hasLowercase) {
      setStrength('fairly-strong');
    } else {
      setStrength('strong');
    }
  };
 console.log(password)
 console.log(strength)
 calculateStrength()
},[password,strength])


  return (
    <div className={`password-strength-meter ${strength}`}>
      <div className="meter-bar" /><h6>password</h6>
      <div className="meter-label">
        {strength === 'weak' && <p>Weak password</p>}
        {strength === 'fairly-strong' && <p>Fairly strong password</p>}
        {strength === 'strong' && <p>Strong password</p>}
      </div>
    </div>
  );
};

function  SignUpForm() {

  const [showPopup, setShowPopup] = useState(false);
  const [data, setData] = useState({
    firstName:'',
    lastName:'',
    username:'',
    password:'',
    city:'',
    state:'',
    zip:'',
    terms:''
  })


  const validatePasswordLength = (password: string) => {
    if (password.length < 8) {
      return 'Password must be at least 8 characters';
    }
    return undefined;
  };


  const handleSubmit = async (values:any) => {
    
    console.log(values)
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
 
      <Container fluid className="d-flex justify-content-center align-content-center mt-5 mb-5 ">
            <Form className='form d-flext justify-content-center align-content-center' noValidate onSubmit={handleSubmit}>
              <Row className="mb-5">
                <Form.Group as={Col} lg='6' controlId="validationFormik01">
                  <Form.Label>First name</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    value={data.firstName}
                    onChange={handleChange} // Use handleChange here
                    className=' custom-input bg-transparent form-control'
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} lg='6' >
                  <Form.Label>Last name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    value={data.lastName}
                    onChange={handleChange}
                    className=' custom-input bg-transparent form-control'
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group> 
              </Row>
             <Row>
               
                
               
                <Form.Group as={Col} md="3" controlId="validationFormik04">
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="State"
                    name="state"
                    value={data.state}
                    onChange={handleChange}
                    className=' custom-input bg-transparent form-control'
                 
                  />
                  <Form.Control.Feedback type="invalid">
               
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="validationFormik05">
                  <Form.Label>Zip</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Zip"
                    name="zip"
                    value={data.zip}
                    onChange={handleChange}
                    className=' custom-input bg-transparent form-control'
                  />
                  <Form.Control.Feedback type="invalid">
                   
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Form.Group className="mb-3">
                <Form.Check
                  required
                  name="terms"
                  label="Agree to terms and conditions"
                  onChange={handleChange}
                  feedbackType="invalid"
                  className=' custom-input bg-transparent form-control'
                  id="validationFormik0"
                />
              </Form.Group>
              <Button type="submit">Submit form</Button>
            </Form>
      </Container>
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

export default  SignUpForm;
