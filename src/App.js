import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import NavSection from "./components/NavSection";
import MainSection from "./components/MainSection";
import Login from "./components/Login";
import Register from "./components/Register";
import WhatIsSection from "./components/WhatIsSection";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import HomePage from "./AdminComponents/HomePage";
import Sidebar from "./AdminComponents/Sidebar";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  const hideNav = location.pathname === "/home"; 

  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn");
    if (loggedInStatus === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <>
      {!hideNav && <NavSection />}
      <Routes>
        <Route path="/" element={<MainSection />} />
        <Route
          path="/home"
          element={<HomePage />} 
        />
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/what-is" element={<WhatIsSection />} />
        <Route path="/about-us" element={<AboutSection />} />
        <Route path="/contact" element={<ContactSection />} />
        <Route path="/sidebar" element={<Sidebar />} />
      </Routes>
    </>
  );
}

export default App;
