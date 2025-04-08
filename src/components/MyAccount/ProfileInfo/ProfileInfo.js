import React from "react";
import { Container, Card } from "react-bootstrap";
import "./ProfileInfo.css";

export default function ProfileInfo() {
  const user = JSON.parse(sessionStorage.getItem("customer"));

  return (
    <div className="info">
      <Container className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <Card className="p-4 shadow-lg" style={{ width: "100%", maxWidth: "500px" }}>
          <Card.Body>
            <Card.Title className="text-center mb-4">Profile Information</Card.Title>
            {user ? (
              <>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Phone:</strong> {user.phone}</p>
              </>
            ) : (
              <p>No user information found.</p>
            )}
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
