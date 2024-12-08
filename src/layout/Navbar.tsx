import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar: React.FC = () => {
  const isUserLoggedIn = localStorage.getItem("loggedIn") === "true";
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <nav className={styles.navbar}>
      <section className={styles.container}>
        <Link to="/" className={styles.logo}>
          Products
        </Link>
        <ul className={styles.navLinks}>
          {isUserLoggedIn ? (
            <>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <button onClick={handleLogout} className={styles.logoutButton}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Signup</Link>
              </li>
            </>
          )}
        </ul>
      </section>
    </nav>
  );
};

export default Navbar;
