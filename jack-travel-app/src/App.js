import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import AccessibilitySidebar from "./components/AccessibilitySidebar";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [theme, setTheme] = useState("default"); // Add state for theme

  // Update the data-theme attribute when the theme changes
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme); // Update the theme state
  };

  return (
    <Router>
      {/* Accessibility Button at the bottom-right */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        style={{
          position: "fixed",
          bottom: "10px", // Positioned at the bottom
          right: "10px", // Positioned at the right side
          background: "blue",
          color: "white",
          border: "none",
          padding: "10px",
          borderRadius: "5px",
          cursor: "pointer",
          zIndex: 1100, // Ensure it's above other content
        }}
      >
        {isSidebarOpen ? "Hide Accessibility" : "Show Accessibility"}
      </button>

      {/* Accessibility Sidebar */}
      <AccessibilitySidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onThemeChange={handleThemeChange} // Pass theme change handler
      />
      
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
