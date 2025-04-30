import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

// Public Components
import NavSection from "./components/NavSection";
import MainSection from "./components/MainSection";
import Login from "./components/Login";
import Register from "./components/Register";
import WhatIsSection from "./components/WhatIsSection";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";

// Admin Components
import HomePage from "./AdminComponents/HomePage";
import Sidebar from "./AdminComponents/Sidebar";
import Announcements from "./AdminComponents/Announcements";
import UserManagement from "./AdminComponents/UserManagement";
import SessionManagement from "./AdminComponents/SessionManagement";
import Settings from "./AdminComponents/Settings";

// Tutee Components
import HomeTutee from "./TuteeComponents/HomeTutee";
import MyBookings from "./TuteeComponents/MyBookings";
import MessagesTutee from "./TuteeComponents/MessagesTutee";
import ProfileTutee from "./TuteeComponents/ProfileTutee";
import SidebarTutee from "./TuteeComponents/SidebarTutee";

// Tutor Components
import HomeTutor from "./TutorComponents/HomeTutor";
import Messages from "./TutorComponents/Messages";
import ProfileTutor from "./TutorComponents/ProfileTutor";
import SidebarTutor from "./TutorComponents/SideBarTutor";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  // Hide nav only on admin, tutee, or tutor pages
  const hideNav =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/tutee") ||
    location.pathname.startsWith("/tutor");

  // Only display Sidebar on Tutor pages, but exclude /tutor/About-Us and /tutor/Contact
  const showSidebar = location.pathname.startsWith("/tutor") && !location.pathname.includes("About-Us") && !location.pathname.includes("Contact");
  const showSidebarTutee = location.pathname.startsWith("/tutee") && !location.pathname.includes("About-Us") && !location.pathname.includes("Contact");

  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(loggedInStatus === "true");
  }, []);

  return (
    <>
      {!hideNav && <NavSection />}

      {showSidebar && <SidebarTutor />}

      {showSidebarTutee && <SidebarTutee />}

      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<MainSection />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/what-is" element={<WhatIsSection />} />
        <Route path="/about-us" element={<AboutSection />} />
        <Route path="/contact" element={<ContactSection />} />

        {/* Admin Routes */}
        <Route path="/admin" element={isLoggedIn ? <Sidebar /> : <Navigate to="/login" />} />
        <Route path="/admin/home" element={isLoggedIn ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/admin/user-manage" element={isLoggedIn ? <UserManagement /> : <Navigate to="/login" />} />
        <Route path="/admin/session-manage" element={isLoggedIn ? <SessionManagement /> : <Navigate to="/login" />} />
        <Route path="/admin/announcements" element={isLoggedIn ? <Announcements /> : <Navigate to="/login" />} />
        <Route path="/admin/settings" element={isLoggedIn ? <Settings /> : <Navigate to="/login" />} />
        <Route path="/sidebar" element={isLoggedIn ? <Sidebar /> : <Navigate to="/login" />} />

        {/* Tutee Routes */}
        <Route path="/tutee/home" element={isLoggedIn ? <HomeTutee /> : <Navigate to="/login" />} />
        <Route path="/tutee/my-bookings" element={isLoggedIn ? <MyBookings /> : <Navigate to="/login" />} />
        <Route path="/tutee/message" element={isLoggedIn ? <MessagesTutee /> : <Navigate to="/login" />} />
        <Route path="/tutee/profile" element={isLoggedIn ? <ProfileTutee /> : <Navigate to="/login" />} />
        <Route path="/tutee/About-Us" element={isLoggedIn ? <AboutSection /> : <Navigate to="/login" />} />
        <Route path="/tutee/Contact" element={isLoggedIn ? <ContactSection /> : <Navigate to="/login" />} />

        {/* Tutor Routes */}
        <Route path="/tutor/home" element={isLoggedIn ? <HomeTutor /> : <Navigate to="/login" />} />
        <Route path="/tutor/profile" element={isLoggedIn ? <ProfileTutor /> : <Navigate to="/login" />} />
        <Route path="/tutor/message" element={isLoggedIn ? <Messages /> : <Navigate to="/login" />} />
        <Route path="/tutor/About-Us" element={isLoggedIn ? <AboutSection /> : <Navigate to="/login" />} />
        <Route path="/tutor/Contact" element={isLoggedIn ? <ContactSection /> : <Navigate to="/login" />} />
      </Routes>
    </>
  );
}

export default App;
