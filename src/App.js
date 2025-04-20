import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import NavSection from "./components/NavSection";
import MainSection from "./components/MainSection";
import Login from "./components/Login";
import Register from "./components/Register";
import WhatIsSection from "./components/WhatIsSection";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import HomePage from "./AdminComponents/HomePage";
import Sidebar from "./AdminComponents/Sidebar";
import Announcements from "./AdminComponents/Announcements";
import UserManagement from "./AdminComponents/UserManagement";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  // Hide nav only on admin paths
  const hideNav = location.pathname.startsWith("/admin");

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
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/what-is" element={<WhatIsSection />} />
        <Route path="/about-us" element={<AboutSection />} />
        <Route path="/contact" element={<ContactSection />} />
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/admin/user-manage" element={<UserManagement />} />

        <Route
          path="/admin"
          element={isLoggedIn ? <Sidebar /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin/home"
          element={isLoggedIn ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin/announcements"
          element={isLoggedIn ? <Announcements /> : <Navigate to="/login" />}
        />

        <Route
          path="/sidebar"
          element={isLoggedIn ? <Sidebar /> : <Navigate to="/login" />}
        />
       
      </Routes>
    </>
  );
}

export default App;