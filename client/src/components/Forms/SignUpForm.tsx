import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container'; // Added Container import
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import * as formik from 'formik';
import * as yup from 'yup';
import { useState } from 'react';
import './SignUpForm.css';

function ContactForm() {
  const { Formik } = formik;
  const [showPopup, setShowPopup] = useState(false);

  const schema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    username: yup.string().required(),
    city: yup.string().required(),
    state: yup.string().required(),
    zip: yup.string().required(),
    terms: yup.bool().required().oneOf([true], 'Terms must be accepted'),

  });
  const anStyles = {
    border: '0',
    background: 'transparent',
    borderBottom: '2px solid white',
    '&:focus': {
      border: '2px solid black',
      outline: 'none',
      background: 'transparent',
    },
  };

  const handleSubmit = async () => {
    // Show the spinner
    // setShowSpinner(true);

    // Simulate an asynchronous operation (e.g., API call)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // After the operation, hide the spinner and show the popup
    // setShowSpinner(false);
    setShowPopup(true);
  };

  const handlePopupClick = () => {
    // Close the popup when the user clicks to continue
    setShowPopup(false);
  };

  return (
    <div>
      <Container fluid className="d-flex justify-content-center align-content-center mt-5 mb-5 ">
        <Formik
          validationSchema={schema}
          onSubmit={console.log}
          initialValues={{
            firstName: 'Mark',
            lastName: 'Otto',
            username: '',
            city: '',
            state: '',
            zip: '',
            terms: false,
          }}
        >
          {({ handleChange, values, touched, errors }) => (
            <Form className='form d-flext justify-content-center align-content-center' noValidate onSubmit={handleSubmit}>
              <Row className="mb-5">
                <Form.Group as={Col} lg='6' controlId="validationFormik01">
                  <Form.Label>First name</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    value={values.firstName}
                    onChange={handleChange}
                    className='custom-input bg-transparent'
                
                    isValid={touched.firstName && !errors.firstName}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} lg='6' controlId="validationFormik02">
                  <Form.Label>Last name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    value={values.lastName}
                    onChange={handleChange}
                    className='form-control'
                    style={{ border: '0', background: 'transparent', borderBottom: "1px solid black" }}
                    isValid={touched.lastName && !errors.lastName}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationFormikUsername">
                  <Form.Label>Username</Form.Label>
                  <InputGroup hasValidation>
                    <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                    <Form.Control
                      type="text"
                      placeholder="Username"
                      aria-describedby="inputGroupPrepend"
                      name="username"
                      value={values.username}
                      onChange={handleChange}
                      style={{ border: '0', background: 'transparent', borderBottom: "1px solid black" }}
                      isInvalid={!!errors.username}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.username}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationFormik03">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="City"
                    name="city"
                    value={values.city}
                    style={{ border: '0', background: 'transparent', borderBottom: "1px solid black" }}
                    onChange={handleChange}
                    isInvalid={!!errors.city}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.city}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="validationFormik04">
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="State"
                    name="state"
                    value={values.state}
                    onChange={handleChange}
                    style={{ border: '0', background: 'transparent', borderBottom: "1px solid black" }}
                    isInvalid={!!errors.state}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.state}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="validationFormik05">
                  <Form.Label>Zip</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Zip"
                    name="zip"
                    value={values.zip}
                    onChange={handleChange}
                    style={{ border: '0', background: 'transparent', borderBottom: "1px solid black" }}
                    isInvalid={!!errors.zip}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.zip}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Form.Group className="mb-3">
                <Form.Check
                  required
                  name="terms"
                  label="Agree to terms and conditions"
                  onChange={handleChange}
                  isInvalid={!!errors.terms}
                  feedback={errors.terms}
                  feedbackType="invalid"
                  style={{ border: '0', background: 'transparent', borderBottom: "1px solid black" }}
                  id="validationFormik0"
                />
              </Form.Group>
              <Button type="submit">Submit form</Button>
            </Form>
          )}
        </Formik>
      </Container>
    <button onClick={handleSubmit}>click</button>
      {showPopup && (
        <div className="popup">
          <p>This is a custom popup. Click to continue.</p>
          <button onClick={handlePopupClick}>Continue</button>
        </div>
      )}
    </div>
  );
}

export default ContactForm;
