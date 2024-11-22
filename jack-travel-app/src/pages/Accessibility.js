import React, { useState } from 'react';
import './Accessibility.css';

function Accessibility() {
  const [theme, setTheme] = useState('light'); // Default theme
  const [font, setFont] = useState('default'); // Default font

  // Change theme
  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme); // Apply to the entire document
  };

  // Change font
  const handleFontChange = (newFont) => {
    setFont(newFont);
    document.documentElement.setAttribute('data-font', newFont);
  };

  return (
    <div className="accessibility">
      <h2>Accessibility Settings</h2>

      {/* Theme Options */}
      <div className="theme-options">
        <h3>Change Theme</h3>
        <button onClick={() => handleThemeChange('light')}>Light Mode</button>
        <button onClick={() => handleThemeChange('dark')}>Dark Mode</button>
        <button onClick={() => handleThemeChange('high-contrast')}>High Contrast</button>
        <button onClick={() => handleThemeChange('sepia')}>Sepia</button>
      </div>

      {/* Font Options */}
      <div className="font-options">
        <h3>Change Font</h3>
        <button onClick={() => handleFontChange('default')}>Default</button>
        <button onClick={() => handleFontChange('dyslexia')}>Dyslexia Font</button>
        <button onClick={() => handleFontChange('large')}>Large Font</button>
      </div>
    </div>
  );
}

export default Accessibility;
