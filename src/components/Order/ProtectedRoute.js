import React from "react";
import { Navigate } from "react-router-dom";
import { usePlan } from "./PlanContext";

const ProtectedRoute = ({ children }) => {
  const { selectedPlan } = usePlan();

  if (!selectedPlan) {
    return <Navigate to="/subscription" replace />; 
  }

  return children;
};

export default ProtectedRoute;