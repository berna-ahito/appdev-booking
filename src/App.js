import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavSection from "./components/NavSection";
import MainSection from "./components/MainSection";
import Login from "./components/Login";
import Register from "./components/Register";
<<<<<<< HEAD
// import AboutUs from "./components/AboutUs";
import AboutSection from "./components/AboutSection";

=======
import ContactSection from "./components/ContactSection";
>>>>>>> d0209dd900030aea2241c7b7821e8d05f3829f6d

function App() {
  return (
    <Router>
      <NavSection />
      <Routes>
        <Route path="/" element={<MainSection />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/about" element={<div>About Wild Teach</div>} />
<<<<<<< HEAD
        <Route path="/how-it-works" element={<div>How It Works</div>} /> */}
        {/* <Route path="/about-us" element={<AboutUs />} /> */}
        <Route path="/about-us" element={<AboutSection />} />

        {/* <Route path="/about-us" element={<div>About Us</div>} /> */}
        {/* <Route path="/contact" element={<div>Contact Us</div>} /> */}
=======
        <Route path="/how-it-works" element={<div>How It Works</div>} />
        <Route path="/about-us" element={<div>About Us</div>} />*/
        <Route path="/contact" element={<ContactSection />} />}
>>>>>>> d0209dd900030aea2241c7b7821e8d05f3829f6d
      </Routes>
    </Router>
  );
}

export default App;


