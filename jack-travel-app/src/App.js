import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Accessibility from "./pages/Accessibility";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/accessibility" element={<Accessibility />} />
      </Routes>
    </Router>
  );
}

export default App;
