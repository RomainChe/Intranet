import React, { useState } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

function Login() {
  const [firstname, setFirstname] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        firstname,
        password,
      });

      const token = response.data.token;
      const isAdmin = response.data.isAdmin;
      localStorage.setItem("token", token);
      localStorage.setItem("admin", isAdmin);
      window.location.href = "/";
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Container className="mt-5">
        <Row className="justify-content-md-center">
          <Col xs={12} md={8} lg={6}>
            <Form className="p-4 border rounded d-flex flex-column justify-content-md-center">
              {" "}
              {/* Ajout de marges intérieures et contours */}
              <h3 className="mb-4 d-flex justify-content-md-center">
                Login
              </h3>{" "}
              {/* Ajout d'un titre */}
              <Form.Group
                className="d-flex flex-column"
                controlId="formFirstname"
              >
                <Form.Label className="align-self-center">Firstname</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your firstname"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  className="w-75 m-auto"
                />
              </Form.Group>
              <Form.Group
                className="mt-4 d-flex flex-column"
                controlId="formPassword"
              >
                <Form.Label className="align-self-center">Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-75 m-auto"
                />
              </Form.Group>
              <Button
                variant="primary"
                onClick={handleLogin}
                className="mt-3 w-50 m-auto"
              >
                Login
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Login;
