import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import "./Navbar.css";

const PublicNavbar = () => (
  <Navbar className="navbar" bg="dark" variant="dark" expand="lg">
    <Container>
      <Navbar.Brand as={Link} to="/">Bangalore Bites</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link as={Link} to="/aboutus">About Us</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  );
  
  export default PublicNavbar;
  