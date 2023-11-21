import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

function TopBar() {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">Mon Application</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="#home">Accueil</Nav.Link>
        <Nav.Link href="#features">Fonctionnalités</Nav.Link>
        <Nav.Link href="#pricing">Tarification</Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default TopBar;
