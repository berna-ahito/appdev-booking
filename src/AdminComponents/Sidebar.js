import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./CSS/Sidebar.css";


function Sidebar() {
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
        <Link to="/admin/home" className="sidebar-link">Home</Link>
        <Link to="/admin/user-manage" className="sidebar-link">User Manage</Link>
        <Link to="/admin/session-manage" className="sidebar-link">Session Manage</Link>
        <Link to="/admin/announcements" className="sidebar-link">Announcements</Link>
        <Link to="/admin/settings" className="sidebar-link">Settings</Link>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>

      <div className="toggle-btn" onClick={toggleSidebar}>
        ☰
      </div>
    </div>
  );
}

export default Sidebar;