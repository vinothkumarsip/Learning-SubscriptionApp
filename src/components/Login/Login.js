import React, { useState } from "react";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";
import "./Login.css"

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await AuthService.login({
        email: formData.email.trim(),
        password: formData.password.trim(),
      });
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/privatehomepage");
    } catch (error) {
      console.error("Login Error:", error);
      setError(error.message || "Invalid email or password");
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
                value={formData.email}
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
                value={formData.password}
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
};

export default Login;
