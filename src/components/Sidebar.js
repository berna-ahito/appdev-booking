import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css"; // Ensure the correct path to the CSS file

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle the sidebar open/close state
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "/login";
  };

  return (
    <div className="sidebar-container">
      {/* Toggle Button (Burger Icon) outside of sidebar */}
      <div className={`toggle-btn ${isOpen ? "hidden" : ""}`} onClick={toggleSidebar}>
        <span>&#9776;</span> {/* This is the burger icon */}
      </div>

      {/* The sidebar itself */}
      <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
        {/* Sidebar Links */}
        <Link to="/home" className="sidebar-link">Home</Link>
        <Link to="/user-manage" className="sidebar-link">User Manage</Link>
        <Link to="/session-manage" className="sidebar-link">Session Manage</Link>
        <Link to="/announcements" className="sidebar-link">Announcements</Link>
        <Link to="/settings" className="sidebar-link">Settings</Link>

        {/* Logout Button */}
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>
    </div>
  );
}

export default Sidebar;
