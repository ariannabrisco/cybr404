import React from "react";

function AccessibilitySidebar({ isOpen, onClose }) {
  const setTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
  };

  const setFont = (font) => {
    document.documentElement.setAttribute("data-font", font);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: isOpen ? 0 : "-300px", // Completely hide off-screen when closed
        height: "100vh",
        width: "300px",
        backgroundColor: "#fff",
        boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
        transition: "right 0.3s ease", // Smooth transition
        zIndex: 1000,
        padding: "20px",
        visibility: isOpen ? "visible" : "hidden", // Ensures it's fully hidden when closed
      }}
    >
      <h2>Accessibility Options</h2>
      <h3>Theme</h3>
      <button onClick={() => setTheme("default")}>Default</button>
      <button onClick={() => setTheme("dark")}>Dark</button>
      <button onClick={() => setTheme("high-contrast")}>High Contrast</button>
      <button onClick={() => setTheme("sepia")}>Sepia</button>
      <h3>Font</h3>
      <button onClick={() => setFont("default")}>Default</button>
      <button onClick={() => setFont("dyslexia")}>Dyslexia Friendly</button>
      <button onClick={() => setFont("large")}>Large Font</button>
    </div>
  );
}

export default AccessibilitySidebar;
