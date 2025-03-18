import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavSection from "./components/NavSection";
import MainSection from "./components/MainSection";
import Login from "./components/Login";
import Register from "./components/Register";
// import AboutUs from "./components/AboutUs";
import AboutSection from "./components/AboutSection";

import ContactSection from "./components/ContactSection";

function App() {
  return (
    <Router>
      <NavSection />
      <Routes>
        <Route path="/" element={<MainSection />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/about" element={<div>About Wild Teach</div>} />
        <Route path="/how-it-works" element={<div>How It Works</div>} /> */}
        {/* <Route path="/about-us" element={<AboutUs />} /> */}
        <Route path="/about-us" element={<AboutSection />} />

        {/* <Route path="/about-us" element={<div>About Us</div>} /> */}
        {/* <Route path="/contact" element={<div>Contact Us</div>} /> */}
        <Route path="/how-it-works" element={<div>How It Works</div>} />
        <Route path="/about-us" element={<div>About Us</div>} />*/
        <Route path="/contact" element={<ContactSection />} />
      </Routes>
    </Router>
  );
}

export default App;


