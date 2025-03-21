import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import PublicHomePage from "./components/PublicHomePage";
import Auth from "./components/Auth";
import AboutUs from "./components/AboutUs"; 
import PrivateHomePage from "./components/PrivateHomePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PublicHomePage />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/privatehomepage" element={<PrivateHomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
