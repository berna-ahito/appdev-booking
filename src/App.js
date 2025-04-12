import React, { useState} from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import NavSection from "./components/NavSection";
import MainSection from "./components/MainSection";
import Login from "./components/Login";
import Register from "./components/Register";
import WhatIsSection from "./components/WhatIsSection";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import HomePage from "./components/HomePage";
import Sidebar from "./components/Sidebar";

function AppWrapper() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  return (
    <Router>
      <App isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    </Router>
  );
}

function App({ isLoggedIn, setIsLoggedIn }) {
  const location = useLocation();

  const hideNav = isLoggedIn || ["/login", "/register"].includes(location.pathname);

  return (
    <>
      {!hideNav && <NavSection />}
      <Routes>
        <Route path="/" element={<MainSection />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/what-is" element={<WhatIsSection />} />
        <Route path="/about-us" element={<AboutSection />} />
        <Route path="/contact" element={<ContactSection />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/sidebar" element={<Sidebar />} />
      </Routes>
    </>
  );
}

export default AppWrapper;
