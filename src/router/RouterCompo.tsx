import React from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import ProductDetails from "../pages/products/ProductDetails";
import LoginPage from "../pages/authentication/login/LoginPage";
import SignupPage from "../pages/authentication/signup/SignupPage";
import ProfilePage from "../pages/profile/ProfilePage";
import ProtectedRoute from "../components/ProtectedRoute";
import Navbar from "../layout/Navbar";
import ProductsList from "../pages/products/ProductsList";

const RouterCompo: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<ProductsList />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<Navigate to={`/`} />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </Router>
  );
};

export default RouterCompo;
