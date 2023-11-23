// EmployeeList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function EmployeeList() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [allLocations, setAllLocations] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/employees",
          {
            params: {
              name: nameFilter,
              location: locationFilter,
              category: categoryFilter,
            },
          }
        );
        setEmployees(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchAllLocations = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/all-locations"
        );
        setAllLocations(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEmployees();
    fetchAllLocations();
  }, [nameFilter, locationFilter, categoryFilter]);

  const isAdmin = localStorage.getItem("admin") === "true";

  const handleEdit = async (employeeId) => {
    navigate(`/edit-employee/${employeeId}`);
    console.log(
      `Rediriger vers la page de modification pour l'employé ${employeeId}`
    );
  };

  return (
    <Container>
      <Form>
        <Row className="mb-3 mt-3">
          <Col md={4}>
            <Form.Control
              type="text"
              placeholder="Filtrer par nom"
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
            />
          </Col>
          <Col md={4}>
            <Form.Select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            >
              <option value="">Toutes les villes</option>
              {allLocations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col md={4}>
            <Form.Select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="">Filtrer par catégorie</option>
              <option value="Technique">Technique</option>
              <option value="Marketing">Marketing</option>
              <option value="Client">Client</option>
            </Form.Select>
          </Col>
        </Row>
      </Form>
      <Row>
        <h2>Liste des Collaborateurs</h2>
        <div className="row">
          {employees.map((employee) => (
            <Col key={employee._id} md={4} className="col-md-4 mb-4">
              <div className="card">
                <img
                  src={employee.photo}
                  alt=""
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{`${employee.firstname} ${employee.lastname}`}</h5>
                  <p className="card-text">
                    <strong>Email :</strong> {employee.email}
                  </p>
                  <p className="card-text">
                    <strong>Téléphone :</strong> {employee.phone}
                  </p>
                  <p className="card-text">
                    <strong>Ville :</strong> {employee.city}
                  </p>
                  <p className="card-text">
                    <strong>Pays :</strong> {employee.country}
                  </p>
                  {isAdmin && (
                    <Button
                      variant="primary"
                      onClick={() => handleEdit(employee._id)}
                    >
                      Modifier
                    </Button>
                  )}
                </div>
              </div>
            </Col>
          ))}
        </div>
      </Row>
    </Container>
  );
}

export default EmployeeList;
