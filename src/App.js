import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import PublicHomePage from "./components/PublicHomePage/PublicHomePage";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/SignUp";
import AboutUs from "./components/AboutUS/AboutUs"; 
import PrivateHomePage from "./components/PrivateHomePage/PrivateHomePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PublicHomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/privatehomepage" element={<PrivateHomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
