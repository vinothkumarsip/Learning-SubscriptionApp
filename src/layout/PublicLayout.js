import PublicNavbar from "../components/Navbar/PublicNavbar"; // if you have it
import Container from "react-bootstrap/Container";
import { Outlet } from "react-router-dom";

export default function PublicLayout() {
  return (
    <>
      <PublicNavbar />
      <Container fluid className="p-0">
        <Outlet />
      </Container>
    </>
  );
}
