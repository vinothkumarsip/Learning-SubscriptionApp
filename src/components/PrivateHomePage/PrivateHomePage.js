import { useNavigate, Link } from "react-router-dom";
import AuthService from "../../services/AuthService";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useEffect } from "react";
import "./PrivateHomePage.css";

export default function PrivateHomePage({ isAuthenticated, setIsAuthenticated }) {
  const navigate = useNavigate(); // eslint-disable-next-line 
  const user = AuthService.getUser(); 

  useEffect(() => {
    if (!sessionStorage.getItem("authToken")) {
      navigate("/", { replace: true }); 
    }
  }, [navigate]);

  return (
    <div className="private-home">
      <div className="background">
        <Container className="d-flex justify-content-center align-items-center text-center h-100">
          <Card className="text-center p-4 shadow-lg welcome-card">
            <Card.Body>
              <Card.Title as="h1">Welcome to Bangalore Bites</Card.Title>
              <Card.Text className="mb-4">
                Hundreds of flavors under one roof!
              </Card.Text>
              <Link to="/subscription">
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