import React from 'react';
import { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container'; // Import the Container component



const NavbarComponent: React.FC = () => {
  const [display, setDisplay] = useState<boolean>(true);

  const handleOnToggle = () => {
  setDisplay(!display);
  };

  const paddingStyle = {
    paddingLeft: '1.5cm',
    paddingRight: '1.5cm',
    '@media (max-width: 15cm)': {
      paddingLeft: '0.7cm',
      paddingRight: '0.7cm',
    },
  };

  return (
    <div>
    <Navbar
      onToggle={handleOnToggle}
      fixed="top"
      expand="lg"
      className="bg-body-tertiary"
     style={paddingStyle}
    >
      <Container fluid={true} >
        <Navbar.Brand>Logo</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link className="text-dark" href="home">
              Home
            </Nav.Link>
            <Nav.Link className="text-dark" href="about-us">
              About Us
            </Nav.Link>
            <Nav.Link className="text-dark" href="login">
              Login
            </Nav.Link>
            <Nav.Link className="text-dark" href="register">
              Register
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  
    </div>
  );
};

export default NavbarComponent;