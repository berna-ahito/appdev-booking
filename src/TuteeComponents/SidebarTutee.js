import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./CSS/SidebarTutee.css";

function SidebarTutee() {
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
        <div className="toggle-btn" onClick={toggleSidebar}>
          ☰
        </div>

        <Link to="/tutee/home" className="sidebar-link">Home</Link>
        <Link to="/tutee/find-tutor" className="sidebar-link">Find a Tutor</Link>
        <Link to="/tutee/my-bookings" className="sidebar-link">My Bookings</Link>
        <Link to="/tutee/message" className="sidebar-link">Messages</Link>
        <Link to="/tutee/profile" className="sidebar-link">Profile</Link>
        <Link to="/tutee/about-us" className="sidebar-link">About Us</Link>
        <Link to="/tutee/contact" className="sidebar-link">Contact</Link>
        <Link to="/tutee/settings" className="sidebar-link">Settings</Link>
        <button onClick={() => setShowLogoutDialog(true)} className="logout-btnTutee">Logout</button>
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

export default SidebarTutee;
