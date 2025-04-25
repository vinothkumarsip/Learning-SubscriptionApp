import React from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function SubPlan() {
  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Choose Your Subscription Plan</h2>
      <Row className="justify-content-center">
        {/* Daily Plan */}
        <Col md={4}>
          <Card className="text-center shadow-sm mb-3 h-100">
            <Card.Body>
              <Card.Title>Daily Plan</Card.Title>
              <Card.Text>
                Get fresh meals delivered to your door every day. Ideal for flexible eating.
              </Card.Text>
              <Link to="/subscription/daily" className="btn btn-secondary">
                Choose Daily
              </Link>
            </Card.Body>
          </Card>
        </Col>

        {/* Monthly Plan */}
        <Col md={4}>
          <Card className="text-center shadow-sm mb-3 h-100">
            <Card.Body>
              <Card.Title>Monthly Plan</Card.Title>
              <Card.Text>
                Enjoy hassle-free meals for the entire month with great savings.
              </Card.Text>
              <Link to="/subscription/monthly" className="btn btn-secondary">
                Choose Monthly
              </Link>
            </Card.Body>
          </Card>
        </Col>

        {/* Yearly Plan */}
        <Col md={4}>
          <Card className="text-center shadow-sm mb-3 h-100">
            <Card.Body>
              <Card.Title>Yearly Plan</Card.Title>
              <Card.Text>
                The most value-packed option! Eat healthy all year long at the best price.
              </Card.Text>
              <Link to="/subscription/yearly" className="btn btn-secondary">
                Choose Yearly
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
