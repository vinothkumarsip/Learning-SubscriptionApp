import React, { useState } from "react";
import { Container, Card, Tab, Nav, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService"; 
import "./Auth.css";

const Auth = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(""); 
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); 

    const userData = {
      email: formData.email.trim(),
      password: formData.password.trim(),
    };

    try {
      const data = await AuthService.login(userData); 
      console.log("Login successful!", data);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/privatehomepage");
    } catch (error) {
      console.error("Login Error:", error);
      setError(error.message || "Invalid email or password");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(""); 

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(formData.phone)) {
      setError("Phone number must be exactly 10 digits.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const signupData = {
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      password: formData.password.trim(),
    };

    try {
      const data = await AuthService.signup(signupData);
      console.log("Signup successful!", data);
      navigate("/privatehomepage"); 
    } catch (error) {
      console.error("Signup Error:", error);
      setError(error.message || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <Container className="d-flex justify-content-center align-items-center">
        <Card className="auth-card">
          <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
            <Nav variant="tabs" className="mb-3">
              <Nav.Item>
                <Nav.Link eventKey="login">Login</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="signup">Register</Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content>
              {/* LOGIN FORM */}
              <Tab.Pane eventKey="login">
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
              </Tab.Pane>

              {/* SIGNUP FORM */}
              <Tab.Pane eventKey="signup">
                <Form onSubmit={handleSignup}>
                  {error && <Alert variant="danger">{error}</Alert>} 
                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      type="tel"
                      name="phone"
                      placeholder="Enter phone number"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
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
                  <Form.Group className="mb-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="confirmPassword"
                      placeholder="Re-enter password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Button type="submit" className="auth-button w-100">
                    Sign up
                  </Button>
                </Form>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Card>
      </Container>
    </div>
  );
};

export default Auth;
