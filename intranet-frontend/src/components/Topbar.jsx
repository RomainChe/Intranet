// TopBar.jsx
import React, { useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";

function TopBar() {
  const [isLoggedIn] = useState(localStorage.getItem("token") !== null);
  const [isAdmin] = useState(localStorage.getItem("admin") !== null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    // Redirige vers la page de connexion après la déconnexion
    return <Navigate to="/login" />;
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Nav className="mr-auto">
        {isLoggedIn ? (
          <>
            <Navbar.Brand as={Link} to="/employees">
              Liste des collaborateurs
            </Navbar.Brand>
            <Nav.Link as={Link} to="/">
              Accueil
            </Nav.Link>
            <Nav.Link as={Link} to="/profile">
              Profil
            </Nav.Link>
            <Nav.Link onClick={handleLogout}>Déconnexion</Nav.Link>
          </>
        ) : (
          <Nav.Link as={Link} to="/login">
            Connexion
          </Nav.Link>
        )}
        {isAdmin ? (
          <>
            <Nav.Link as={Link} to="/add-employee">
              Ajouter
            </Nav.Link>
          </>
        ) : (
          {}
        )}
      </Nav>
    </Navbar>
  );
}

export default TopBar;
