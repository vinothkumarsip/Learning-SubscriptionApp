import React from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function MyAccount() {
  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">My Account</h2>
      <Row className="justify-content-center">
        <Col md={5}>
          <Card className="mb-3 shadow-sm">
            <Card.Body className="text-center">
              <Card.Title>Profile Information</Card.Title>
              <Card.Text>View your profile details.</Card.Text>
              <Link to="/myaccount/profile" className="btn btn-secondary">
                View Profile
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={5}>
          <Card className="mb-3 shadow-sm">
            <Card.Body className="text-center">
              <Card.Title>Subscription Details</Card.Title>
              <Card.Text>View your subscriptions and plans.</Card.Text>
              <Link to="/aboutus" className="btn btn-secondary">
                Go to About Us
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
