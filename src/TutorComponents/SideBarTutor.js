import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './CSS/SideBarTutor.css';

function SideBarTutor() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(prev => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  return (
    <div className="sidebar-container">
      <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <div className="toggle-btn" onClick={toggleSidebar}>
          ☰
        </div>

        <Link to="/tutor/home" className="sidebar-link">Home</Link>
        <Link to="/tutor/manage" className="sidebar-link">Manage Session</Link>
        <Link to="/tutor/message" className="sidebar-link">Messages</Link>
        <Link to="/tutor/profile" className="sidebar-link">Profile</Link>
        <Link to="/tutor/about-us" className="sidebar-link">About Us</Link>
        <Link to="/tutor/contact" className="sidebar-link">Contact</Link>
        <Link to="/tutor/settings" className="sidebar-link">Settings</Link>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>
      
      {/* Logout confirmation dialog */}
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

export default SideBarTutor;
