// TopBar.jsx
import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

function TopBar() {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/">Mon Application</Navbar.Brand>
      <Nav className="mr-auto">
        <NavLink to="/" exact="true" className="nav-link">Accueil</NavLink>
        <NavLink to="/login" exact="true" className="nav-link">Login</NavLink>
      </Nav>
    </Navbar>
  );
}

export default TopBar;
