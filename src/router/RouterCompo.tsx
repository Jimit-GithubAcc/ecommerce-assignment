import React from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import HomePage from "../pages/home/HomePage";
import ProductDetails from "../pages/products/ProductDetails";
import LoginPage from "../pages/authentication/login/LoginPage";
import SignupPage from "../pages/authentication/signup/SignupPage";
import ProfilePage from "../pages/profile/ProfilePage";

const RouterCompo: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="*" element={<Navigate to={`/`} />} />
      </Routes>
    </Router>
  );
};

export default RouterCompo;
