import React, { useEffect } from 'react';
import { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { isLargeScreen } from '../helpers/helpers';
import { useNavigate } from 'react-router-dom';

const NavbarComponent: React.FC = () => {
  const [iconDisplay,setIconDisplay] = useState<boolean>(true)

  const navigate = useNavigate()

 useEffect(()=>{
  const largeScreen = isLargeScreen()
  if (largeScreen){
    setIconDisplay(false)
  }
  
 },[])
  const handleOnToggle = () => {
  setIconDisplay(!iconDisplay);
  };

  const navLinks = [
    { path: 'about-us', text: 'About Us' },
    { path: 'fund-managers', text: 'Fund Managers' },
  ];

  return (
    <Navbar
      onToggle={handleOnToggle}
      fixed="top"
      expand="lg"
      className="bg-body-tertiary px-4"
    >  
     <div>{iconDisplay && <div onClick={()=>navigate('/signup') }><FontAwesomeIcon icon = {faUser}/></div>}</div>
        <Navbar.Brand>Logo</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
          <Nav.Link><div onClick={()=>navigate('/signup') }><FontAwesomeIcon icon = {faUser}/></div></Nav.Link>
          {navLinks.map((link, index) => (
        <Nav.Link key={index} className="text-dark" href={link.path}>
          {link.text}
        </Nav.Link>
      ))}
          </Nav>
        </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;