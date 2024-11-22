import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.link}>Home</Link>
      <Link to="/login" style={styles.link}>Login</Link>
    </nav>
  );
};

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-around", // Evenly spaces out the links.
    background: "#ff69b4",
    padding: "1rem",
  },
  link: {
    color: "white", // White text for better visibility.
    textDecoration: "none", // Removes the default underline.
    fontSize: "1.2rem",
  },
};

export default Navbar;
