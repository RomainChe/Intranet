// TopBar.jsx
import React, { useState, useEffect } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';

function TopBar() {
    const [isLoggedIn, setIsLoggedIn] = useState(true); // Initialisez avec l'état initial approprié
    const [redirect, setRedirect] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        setRedirect(true);
    };

    useEffect(() => {
        if (redirect) {
            navigate("/login");
            setRedirect(false);
            setIsLoggedIn(false);
        }
    }, [redirect, navigate]);

    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand as={Link} to="/employees">
                Liste des colaborateurs
            </Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link as={Link} to="/">
                    Accueil
                </Nav.Link>
                {isLoggedIn ? (
                    <>
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
            </Nav>
        </Navbar>
    );
}

export default TopBar;
