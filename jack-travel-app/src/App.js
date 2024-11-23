// imports
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import "./index.css";
import Navbar from "./components/Navbar";
import AccessibilitySidebar from "./components/AccessibilitySidebar";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  {/* Sidebar Functionality */}
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  {/* Theme Functionality */}
  const [theme, setTheme] = useState("default");
    useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <Router>
      {/* Accessibility Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        style={{
          position: "fixed",
          bottom: "10px",
          right: "10px",
          background: "blue",
          color: "white",
          border: "none",
          padding: "10px",
          borderRadius: "5px",
          cursor: "pointer",
          zIndex: 2000,  // above Sidebar when open
        }}
      >
        {isSidebarOpen ? "Hide Accessibility" : "Show Accessibility"}
      </button>

      {/* Accessibility Sidebar */}
      <AccessibilitySidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      
      {/* NavBar */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
