import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { postData } from '../helpers/api';

import { useNavigate } from 'react-router-dom';
import { setAuthTokenAndNavigate } from '../helpers/helpers';



const AdminLogin: React.FC = () => {
  const [data, setData] = useState({
    password: '',
    email: '',
  });
const navigate = useNavigate()
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { password,  email } = data;
    if (email===''|| password===''){
      alert('email or password empty');
      return;
    }
    const responseStatus = await postData('hello',data,navigate,'/admin-dashboard/xxx',setAuthTokenAndNavigate)
    if (responseStatus !== 200)
    {
        alert('error occured while trying to login admin')
    }
    
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.preventDefault();
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Container fluid className="d-flex justify-content-center align-content-center mt-5 mb-5">
      <Form className="form d-flext justify-content-center align-content-center" noValidate onSubmit={handleSubmit}>
   
        <Row>
          <Form.Group as={Col} lg="12" controlId="validationFormik04">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              className=" custom-input bg-transparent form-control"
            />
          </Form.Group>
        </Row>
        <br />
        <Row>
          <Form.Group as={Col} lg="12" controlId="validationFormik04">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              name="password"
              value={data.password}
              onChange={handleChange}
              className=" custom-input bg-transparent form-control"
            />
          </Form.Group>
        </Row>
        <br />

        <Button type="submit">Login</Button>
      </Form>
    </Container>
  );
};

export default AdminLogin