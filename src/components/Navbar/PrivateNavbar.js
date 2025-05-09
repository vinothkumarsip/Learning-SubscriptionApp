import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import "./Navbar.css";

export default function PrivateNavbar({ setIsAuthenticated }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("customer");
    setIsAuthenticated(false);
    navigate("/", { replace: true });
    window.history.replaceState(null, "", "/");
  };

  return (
    <Navbar className="navbar" bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/privatehomepage">Bangalore Bites</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/aboutus">About Us</Nav.Link>
              <Nav.Link as={Link} to="/myaccount">My Account</Nav.Link>
              <Button className="logout-btn" onClick={handleLogout}>Logout</Button> 
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      );
}