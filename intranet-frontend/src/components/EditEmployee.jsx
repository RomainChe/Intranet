import React, { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditEmployee = () => {
  const navigate = useNavigate();
  const { employeeId } = useParams();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    birthdate: "",
    city: "",
    country: "",
    email: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/employee/${employeeId}`
        );
        setFormData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    setIsLoading(false);
    fetchEmployeeData();
  }, [employeeId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8000/api/edit-employee/${employeeId}`,
        {
          ...formData,
          isAdmin: formData.isAdmin || false,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
  
      navigate('/employees');
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  return (
    <Container>
      <h2>Modifier un collaborateur</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formFirstname">
          <Form.Label>Prénom</Form.Label>
          <Form.Control
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formLastname">
          <Form.Label>Nom</Form.Label>
          <Form.Control
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBirthdate">
          <Form.Label>Date de naissance</Form.Label>
          <Form.Control
            type="date"
            name="birthdate"
            value={formData.birthdate}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formCity">
          <Form.Label>Ville</Form.Label>
          <Form.Control
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formCountry">
          <Form.Label>Pays</Form.Label>
          <Form.Control
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formIsAdmin">
          <Form.Check
            type="checkbox"
            label="Administrateur"
            name="isAdmin"
            checked={formData.isAdmin}
            onChange={(e) =>
              setFormData({ ...formData, isAdmin: e.target.checked })
            }
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Enregistrer les modifications
        </Button>
      </Form>
    </Container>
  );
};

export default EditEmployee;
