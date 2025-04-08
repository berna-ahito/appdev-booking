import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavSection from "./components/NavSection";
import MainSection from "./components/MainSection";
import Login from "./components/Login";
import Register from "./components/Register";
import WhatIsSection from "./components/WhatIsSection";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import HomePage from "./components/HomePage";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <Router> 
      <NavSection />
      <Routes>
        <Route path="/" element={<MainSection />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/what-is" element={<WhatIsSection />} />
        <Route path="/about-us" element={<AboutSection />} />
        <Route path="/contact" element={<ContactSection />} />
      </Routes>
      <Sidebar />
      <Routes>
       <Route path="/home" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
