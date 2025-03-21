import React, { useState } from "react";
import { Container, Card, Tab, Nav, Form, Button } from "react-bootstrap";
import "./Auth.css"; 
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (event) => {
    event.preventDefault();
  
    const signupData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      password: formData.password.trim(),
    };
  
    console.log("Sending Data:", signupData); 
  
    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      });
  
      console.log("Response Status:", response.status);
  
      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("Signup Successful:", data);
      navigate("/privatehomepage");
    } catch (error) {
      console.error("Signup Error:", error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const userData = { 
        email: formData.email.trim(), 
        password: formData.password.trim() 
    };

    console.log("Sending Login Data:", JSON.stringify(userData));

    try {
        const response = await fetch("http://localhost:5000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        console.log("Response Status:", response.status);

        if (response.ok) {
            const data = await response.json();
            console.log("Login successful!", data);

            localStorage.setItem("user", JSON.stringify(data.user));

            navigate("/privatehomepage");
        } else {
            const errorData = await response.json();
            console.error("Login failed!", errorData);
        }
    } catch (error) {
        console.error("Error:", error);
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
