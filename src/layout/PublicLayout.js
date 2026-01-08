import PublicNavbar from "../components/Navbar/PublicNavbar";
import Container from "react-bootstrap/Container";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer/Footer";

export default function PublicLayout() {
  const location = useLocation();
  const hideFooterPaths = ["/"]; 

  return (
    <>
      <PublicNavbar />
      <Container fluid className="p-0 page-content">
        <Outlet />
      </Container>
      {!hideFooterPaths.includes(location.pathname) && <Footer />}
    </>
  );
}