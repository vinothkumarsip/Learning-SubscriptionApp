import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import PublicHomePage from "./components/PublicHomePage/PublicHomePage";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/SignUp";
import AboutUs from "./components/AboutUS/AboutUs";
import PrivateHomePage from "./components/PrivateHomePage/PrivateHomePage";
import PrivateRoute from "./components/PrivateHomePage/PrivateRoute";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("authToken"); 
    setIsAuthenticated(!!token);
  }, []);

  return (
    <Router>
      <Routes>
        
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/privatehomepage" replace /> : <PublicHomePage />}
        />

        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/privatehomepage" replace /> : <Login setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="/signup"
          element={isAuthenticated ? <Navigate to="/privatehomepage" replace /> : <Signup />}
        />

        <Route path="/aboutus" element={<AboutUs />} />

        <Route
          path="/privatehomepage"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <PrivateHomePage setIsAuthenticated={setIsAuthenticated} />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;