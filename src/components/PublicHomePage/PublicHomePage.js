import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import "./PublicHomePage.css"; 

export default function PublicHomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("authToken")) {
      navigate("/privatehomepage", { replace: true });
    }
  }, [navigate]);

  return (
    <div className="public-home">
      <div className="background">
        <Container className="d-flex justify-content-center align-items-center text-center h-100">
          <Card className="text-center p-4 shadow-lg welcome-card">
            <Card.Body>
              <Card.Title as="h1">Welcome to Bangalore Bites</Card.Title>
              <Card.Text className="mb-4">
                Delicious meals delivered daily!
              </Card.Text>
              <div className="button-group">
                <Link to="/signup">
                  <Button variant="primary" size="lg" className="signup-btn">
                    Sign-Up
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="primary" size="lg" className="login-btn">
                    Login
                  </Button>
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </div>
  );
}
