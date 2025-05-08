import PrivateNavbar from "../components/Navbar/PrivateNavbar";
import Container from "react-bootstrap/Container";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer/Footer"; 

export default function PrivateLayout({ setIsAuthenticated }) {
  const location = useLocation();
  const hideFooterPaths = ["/privatehomepage"]; 

  return (
    <>
      <PrivateNavbar setIsAuthenticated={setIsAuthenticated} />
      <Container fluid className="p-0 page-content">
        <Outlet />
      </Container>
      {!hideFooterPaths.includes(location.pathname) && <Footer />}
    </>
  );
}