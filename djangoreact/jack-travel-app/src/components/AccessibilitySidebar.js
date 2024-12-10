import React from "react";

function AccessibilitySidebar({ isOpen, onClose }) {
  const setTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
  };

  const setFont = (font) => {
    document.documentElement.setAttribute("data-font", font);
  };

  return (
    // Container for everything in sidebar
    <div
      style={{
        position: "fixed",
        top: 0,
        right: isOpen ? 0 : "-300px",
        width: "300px",
        backgroundColor: "#fff",
        boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
        transition: "right 0.3s ease",
        zIndex: 1000,
        padding: "20px",
        visibility: isOpen ? "visible" : "hidden",
      }}
    >
      <h2>Accessibility Options</h2>
      <h3>Themes</h3>
      {/* Buttons for Themes & Fonts */}
      <button onClick={() => setTheme("default")}>Default</button>
      <button onClick={() => setTheme("dark")}>Dark</button>
      <button onClick={() => setTheme("high-contrast")}>High Contrast</button>
      <button onClick={() => setTheme("sepia")}>Sepia</button>
      <h3>Fonts</h3>
      <button onClick={() => setFont("default")}>Default</button>
      <button onClick={() => setFont("dyslexia")}>Dyslexia Friendly</button>
      <button onClick={() => setFont("large")}>Large Font</button>
    </div>
  );
}

export default AccessibilitySidebar;
