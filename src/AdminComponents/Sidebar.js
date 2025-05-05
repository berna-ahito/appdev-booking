import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./CSS/Sidebar.css";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

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
        <button onClick={() => setShowLogoutDialog(true)} className="logout-btn">Logout</button>
      </div>

      <div className="toggle-btn" onClick={toggleSidebar}>
        ☰
      </div>

      {showLogoutDialog && (
        <>
          <div className="dialog-overlay" onClick={() => setShowLogoutDialog(false)}></div>
          <div className="logout-dialog">
            <h3>Confirm Logout</h3>
            <p>Are you sure you want to log out?</p>
            <div className="dialog-buttons">
              <button onClick={handleLogout}>Yes</button>
              <button onClick={() => setShowLogoutDialog(false)}>Cancel</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Sidebar;
