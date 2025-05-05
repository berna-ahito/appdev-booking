import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import HeaderAdmin from "./HeaderAdmin";
import "./CSS/HomePage.css";

function HomePage() {
  const [activeStudents, setActiveStudents] = useState(0);
  const [activeTutors, setActiveTutors] = useState(0);
  const [activeSessions, setActiveSessions] = useState(0);
  const [activeAnnouncements, setActiveAnnouncements] = useState([]);
  const [adminName, setAdminName] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    if (storedName) {
      setAdminName(storedName);
    }
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/student/activeStudentsCount")
      .then((response) => response.json())
      .then((data) => {
        setActiveStudents(data);
      })
      .catch((error) => {
        console.error("Error fetching active students data:", error);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/tutor/activeCount")
      .then((response) => response.json())
      .then((data) => {
        setActiveTutors(data);
      })
      .catch((error) => {
        console.error("Error fetching active tutors data:", error);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/booking/activeSessionsCount")
      .then((response) => response.json())
      .then((data) => {
        setActiveSessions(data);
      })
      .catch((error) => {
        console.error("Error fetching active sessions data:", error);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/announcement/activeAnnounce")
      .then((response) => response.json())
      .then((data) => {
        setActiveAnnouncements(data);
      })
      .catch((error) => {
        console.error("Error fetching active announcements data:", error);
      });
  }, []);

  return (
    <div>
      <HeaderAdmin />
      <Sidebar />

      <div className="homepage-container">
        <div className="homepage-content">
          <div className="admin-info">
            <h2>Welcome, {adminName || "Admin"}</h2>
            <p className="admin-role">Admin</p>
          </div>

          <div className="dashboard-stats">
            <div className="stat-card maroon">
              <h3>Active Students</h3>
              <p>{activeStudents}</p>
            </div>
            <div className="stat-card maroon">
              <h3>Active Tutors</h3>
              <p>{activeTutors}</p>
            </div>
            <div className="stat-card yellow">
              <h3>Active Sessions</h3>
              <p>{activeSessions}</p>
            </div>
          </div>

          <hr className="divider" />

          <div className="announcements-card">
            <h3>Active Announcements</h3>
            {activeAnnouncements.length > 0 ? (
              <ul>
                {activeAnnouncements.map((announcement) => (
                  <li key={announcement.announcement_id}>
                    <p>{announcement.message}</p>
                    <small>Created at: {announcement.created_at}</small>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No active announcements.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
