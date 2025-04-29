import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./CSS/SidebarTutee.css";

function SidebarTutee() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(prev => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "/login";
  };

  return (
    <div className="sidebar-container">
      <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <div className="toggle-btn" onClick={toggleSidebar}>
          ☰
        </div>

        <Link to="/tutee/home" className="sidebar-link">Home</Link>
        <Link to="/tutee/find-a-tutor" className="sidebar-link">Find a Tutor</Link>
        <Link to="/tutee/my-bookings" className="sidebar-link">My Bookings</Link>
        <Link to="/tutee/message" className="sidebar-link">Messages</Link>
        <Link to="/tutee/profile" className="sidebar-link">Profile</Link>
        <Link to="/tutee/about-us" className="sidebar-link">About Us</Link>
        <Link to="/tutee/contact" className="sidebar-link">Contact</Link>
        <Link to="/admin/settings" className="sidebar-link">Settings</Link>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>
    </div>
  );
}

export default SidebarTutee;
