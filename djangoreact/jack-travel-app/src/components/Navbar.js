import React from "react";
import { Link } from "react-router-dom";
// import eventFilled from "../images/events_filled.svg"; <img src={eventFilled}></img>

const Navbar = () => {
  const username = window.localStorage.getItem("username");
  if (username) {
    return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.link}>🏡 Home</Link>
        <Link to="/profile" style={styles.link}>👤 Hello {username}</Link>
        <Link to="/login" style={styles.link}>🚪 Logout</Link>
    </nav>
  );
  } else {
      return (
        <nav style={styles.nav}>
          <Link to="/" style={styles.link}>🏡 Home</Link>
            <Link to="/login" style={styles.link}>👤 Login / Sign Up</Link>
        </nav>
      );
  }
};

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-around", // Evenly spaces out the links.
    background: "#DB006E",
    padding: "1rem",
  },
  link: {
    color: "white", // White text for better visibility.
    textDecoration: "none", // Removes the default underline.
    fontSize: "1.2rem",
  },
};

export default Navbar;
