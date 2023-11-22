// AddEmployee.jsx
import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddEmployee = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    birthdate: "",
    city: "",
    country: "",
    email: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:8000/api/user/add-employee",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      navigate("/employees");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <h2 className="mt-3 mb-5 d-flex justify-content-center">
        Ajouter un collaborateur
      </h2>
      <Form className="w-75 m-auto border border-primary p-5 rounded bg-light" onSubmit={handleSubmit}>
        <Form.Group className="d-flex justify-content-between" controlId="formFirstname">
          <Form.Label className="p-2">Prénom</Form.Label>
          <Form.Control
          className="w-75"
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="d-flex mt-3 justify-content-between" controlId="formLastname">
          <Form.Label className="p-2">Nom</Form.Label>
          <Form.Control
          className="w-75"
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="d-flex mt-3 justify-content-between" controlId="formGender">
          <Form.Label className="p-2">Genre</Form.Label>
          <Form.Select
          className="w-75"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Sélectionnez le genre</option>
            <option value="male">Homme</option>
            <option value="female">Femme</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="d-flex mt-3 justify-content-between" controlId="formBirthdate">
          <Form.Label className="p-2">Date de naissance</Form.Label>
          <Form.Control
          className="w-75"
            type="date"
            name="birthdate"
            value={formData.birthdate}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="d-flex mt-3 justify-content-between" controlId="formCity">
          <Form.Label className="p-2">Ville</Form.Label>
          <Form.Control
          className="w-75"
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="d-flex mt-3 justify-content-between" controlId="formCountry">
          <Form.Label className="p-2">Pays</Form.Label>
          <Form.Control
          className="w-75"
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="d-flex mt-3 justify-content-between" controlId="formEmail">
          <Form.Label className="p-2">Email</Form.Label>
          <Form.Control
          className="w-75"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <div className="text-center">
          <Button className="mt-5" variant="primary" type="submit">
            Ajouter
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default AddEmployee;
