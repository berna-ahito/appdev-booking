import React from "react";
import Sidebar from "./Sidebar";
import HeaderAdmin from "./HeaderAdmin";
import "./CSS/HomePage.css";

function HomePage() {
  return (
    <div>
      <HeaderAdmin />
      <Sidebar />

      <div className="homepage-container">
        <div className="homepage-content">
          <div className="admin-info">
            <h2>Admin123</h2>
            <p className="admin-role">Admin</p>
          </div>

          <div className="dashboard-stats">
            <div className="stat-card maroon">
              <h3>Active Students</h3>
              <p>15</p>
            </div>
            <div className="stat-card maroon">
              <h3>Active Tutor</h3>
              <p>10</p>
            </div>
            <div className="stat-card yellow">
              <h3>Active Sessions</h3>
              <p>22</p>
            </div>
          </div>

          <hr className="divider" />

          <div className="announcements-card">
            <h3>Announcements</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
