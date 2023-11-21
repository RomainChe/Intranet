// Profile.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Button } from 'react-bootstrap';

function Profile() {
  const [user, setUser] = useState({
    firstname: '',
    lastname: '',
    birthdate: '',
    city: '',
    country: '',
    email: '',
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('http://localhost:8000/api/user/update-profile', user);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/user/profile');
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <Container>
      <h2>Profil de l'utilisateur</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formFirstname">
          <Form.Label>Prénom</Form.Label>
          <Form.Control
            type="text"
            name="firstname"
            value={user.firstname}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formLastname">
          <Form.Label>Nom</Form.Label>
          <Form.Control
            type="text"
            name="lastname"
            value={user.lastname}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBirthdate">
          <Form.Label>Date de naissance</Form.Label>
          <Form.Control
            type="date"
            name="birthdate"
            value={user.birthdate}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formCity">
          <Form.Label>Ville</Form.Label>
          <Form.Control
            type="text"
            name="city"
            value={user.city}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formCountry">
          <Form.Label>Pays</Form.Label>
          <Form.Control
            type="text"
            name="country"
            value={user.country}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Enregistrer les modifications
        </Button>
      </Form>
    </Container>
  );
}

export default Profile;
