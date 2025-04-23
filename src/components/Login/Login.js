import React, { useState, useEffect } from "react";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";
import "./Login.css";

export default function Login({ setIsAuthenticated }) {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("authToken")) {
      navigate("/privatehomepage", { replace: true }); 
    }
  }, [navigate]);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await AuthService.login(credentials);
      sessionStorage.setItem("userEmail", credentials.email);
      sessionStorage.setItem("isAuthenticated", "true"); 
      setIsAuthenticated(true);
      navigate("/privatehomepage", { replace: true });
      window.history.replaceState(null, "", "/privatehomepage");
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error);
      } else {
        setError("Network error. Please try again later.");
      }
      console.error("Login Error:", error);
    }
  };
  
  return (
    <div className="auth-container">
      <Container className="d-flex justify-content-center align-items-center">
        <Card className="auth-card">
          <Form onSubmit={handleLogin}>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                value={credentials.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter password"
                value={credentials.password}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button type="submit" className="auth-button w-100 mt-3">
              Sign in
            </Button>
          </Form>
        </Card>
      </Container>
    </div>
  );
}