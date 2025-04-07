import PrivateNavbar from "../components/Navbar/PrivateNavbar";
import Container from "react-bootstrap/Container";
import { Outlet } from "react-router-dom";

export default function PrivateLayout({ setIsAuthenticated }) {
  return (
    <>
      <PrivateNavbar setIsAuthenticated={setIsAuthenticated} />
      <Container fluid className="p-0">
        <Outlet />
      </Container>
    </>
  );
}
