import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import "./PrivateHomePage.css"; 

export default function PrivateHomePage() {
  return (
    <div className="private-home">
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/privatehomepage">Bangalore Bites</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/aboutus">About Us</Nav.Link>
              <Nav.Link as={Link} to="/myaccount">My Account</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="background">
        <Container className="d-flex justify-content-center align-items-center text-center h-100">
          <Card className="text-center p-4 shadow-lg welcome-card">
            <Card.Body>
              <Card.Title as="h1">Welcome to Bangalore Bites</Card.Title>
              <Card.Text className="mb-4">
              Hundreds of flavors under one roof!
              </Card.Text>
              <Link to="/subplan">  
                <Button variant="primary" size="lg" className="subs-btn">
                  See Subscription Plans
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </div>
  );
}
