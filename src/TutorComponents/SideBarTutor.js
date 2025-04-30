import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./CSS/SideBarTutor.css";

function SideBarTutor() {
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
        <Link to="/tutor/home" className="sidebar-link">Home</Link>
        <Link to="/tutor/manage" className="sidebar-link">Manage Session</Link>
        <Link to="/tutor/message" className="sidebar-link">Messages</Link>
        <Link to="/tutor/profile" className="sidebar-link">Profile</Link>
        <Link to="/tutor/about-us" className="sidebar-link">About Us</Link>
        <Link to="/tutor/contact" className="sidebar-link">Contact</Link>
        <Link to="/admin/settings" className="sidebar-link">Settings</Link>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>

      <div className="toggle-btn" onClick={toggleSidebar}>
        ☰
      </div>
    </div>
  );
}

export default SideBarTutor;
