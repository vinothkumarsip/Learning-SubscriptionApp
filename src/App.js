import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import PublicHomePage from "./components/PublicHomePage/PublicHomePage";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/SignUp";
import AboutUs from "./components/AboutUS/AboutUs";

import PrivateHomePage from "./components/PrivateHomePage/PrivateHomePage";
import MyAccount from "./components/MyAccount/MyAccount";
import ProfileInfo from "./components/MyAccount/ProfileInfo/ProfileInfo";
import SubscriptionListPage from "./components/MyAccount/SubscriptionDetails/SubscriptionList";
import UpcomingSubscription from "./components/MyAccount/SubscriptionDetails/UpcomingSubscription";
import SubscriptionDetails from "./components/MyAccount/SubscriptionDetails/ViewSubscriptionDetails";
import CartPage from "./components/MyAccount/Cart/CartPage";
import SubPlan from "./components/SubPlan/SubPlan";
import Daily from "./components/SubPlan/Daily";
import Monthly from "./components/SubPlan/Monthly";
import Yearly from "./components/SubPlan/Yearly";
import OrderPage from "./components/Order/OrderPage";
import ProtectedRoute from "./components/Order/ProtectedRoute";
import { PlanProvider } from "./components/Order/PlanContext";

import PublicLayout from "./layout/PublicLayout";
import PrivateLayout from "./layout/PrivateLayout";

import PrivateRoute from "./components/PrivateHomePage/PrivateRoute";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    setIsAuthenticated(!!token);
  }, []);

  return (
    <PlanProvider>
      <Router>
        <Routes>
          {/* Public Routes - PublicLayout */}
          <Route element={<PublicLayout />}>
            <Route
              path="/"
              element={
                isAuthenticated ? <Navigate to="/privatehomepage" replace /> : <PublicHomePage />
              }
            />
            <Route
              path="/login"
              element={
                isAuthenticated ? (
                  <Navigate to="/privatehomepage" replace />
                ) : (
                  <Login setIsAuthenticated={setIsAuthenticated} />
                )
              }
            />
            <Route
              path="/signup"
              element={
                isAuthenticated ? (
                  <Navigate to="/privatehomepage" replace />
                ) : (
                  <Signup />
                )
              }
            />
            <Route path="/aboutus" element={<AboutUs />} />
          </Route>

          {/* Private Routes - PrivateLayout */}
          <Route
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <PrivateLayout setIsAuthenticated={setIsAuthenticated} />
              </PrivateRoute>
            }
          >
            <Route path="/privatehomepage" element={<PrivateHomePage />} />
            <Route path="/myaccount" element={<MyAccount />} />
            <Route path="/myaccount/profile" element={<ProfileInfo />} />
            <Route path="/myaccount/mysubscription" element={<SubscriptionListPage />} />
            <Route path="/subscription/:id/upcoming" element={<UpcomingSubscription />} />
            <Route path="/subscription/:id/details" element={<SubscriptionDetails />} />
            <Route path="/myaccount/cart" element={<CartPage />} />
            <Route path="/subscription" element={<SubPlan />} />
            <Route path="/subscription/daily" element={<Daily />} />
            <Route path="/subscription/monthly" element={<Monthly />} />
            <Route path="/subscription/yearly" element={<Yearly />} />
            <Route
              path="/order"
              element={
                <ProtectedRoute>
                  <OrderPage />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </Router>
    </PlanProvider>
  );
}

export default App;