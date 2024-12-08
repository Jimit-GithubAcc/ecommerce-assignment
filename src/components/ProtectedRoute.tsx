import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute: React.FC = () => {
  const isUserLoggedIn = localStorage.getItem("loggedIn") === "true";

  return isUserLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
