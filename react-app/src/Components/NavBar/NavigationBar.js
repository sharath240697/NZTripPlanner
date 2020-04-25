import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import styled from 'styled-components';
import  './NavigationBar.css';

const Styles = styled.div`
  .navbar { background-color: #222; }
  a, .navbar-nav, .navbar-light  {
    text-decoration: none;
    color: #9FFFCB;
    &:hover { color: white; }
  }
  .navbar-brand {
    font-size: 1.4em;
    color: #9FFFCB;
    &:hover { color: white; }
  }
  .form-center {
    position: absolute !important;
    left: 25%;
    right: 25%;
  }
`;
export const NavigationBar = () => {
  console.log('in Navigationbar.js file')

  return (
    <Styles>
      <Link to='/plantrip'></Link>
      <Navbar expand="lg">
        <Navbar.Brand ><Link className="nav-bar-link" to='/'>  NZ Trip Plan   </Link> </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
         <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
          <Nav.Item>    <Link className="nav-bar-link" to='/plantrip'>  Plan Trip   </Link>    </Nav.Item> 
          <Nav.Item>  <Link className="nav-bar-link" to='/savedtrip'>  Saved Trip  </Link>  </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Styles>
  );

}

export default NavigationBar;





