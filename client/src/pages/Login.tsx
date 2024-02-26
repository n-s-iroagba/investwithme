// import Button from 'react-bootstrap/Button';
// import Col from 'react-bootstrap/Col';
// import Form from 'react-bootstrap/Form';
// import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container'; // Added Container import




const Login:React.FC=()=>{

  return (
 
      <Container fluid className="d-flex justify-content-center align-content-center mt-5 mb-5 ">
            {/* <Form className='form d-flext justify-content-center align-content-center' noValidate onSubmit={handleSubmit}>
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
            </Form> */}
      </Container>
  )
}

export default  Login;
