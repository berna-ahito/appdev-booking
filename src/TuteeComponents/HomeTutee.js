import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderTutee from './HeaderTutee';
import SidebarTutee from './SidebarTutee';
import './CSS/HomeTutee.css';

function HomeTutee() {
  const [tutorInfo, setTutorInfo] = useState(null);
  const [announcements, setAnnouncements] = useState([]);
  const navigate = useNavigate();

  // ✅ Fetching Tutor Info (keep your original endpoint here if correct)
  useEffect(() => {
    fetch('http://localhost:8080/api/tutor-schedule') // <— This is correct if this is the actual tutor info endpoint
      .then(response => response.json())
      .then(data => setTutorInfo(data))
      .catch(error => console.error('Error fetching tutor info:', error));
  }, []);

  // ✅ Fetching Announcements from the same endpoint the Admin uses
  useEffect(() => {
    fetch('http://localhost:8080/announcement/getAllAnnounce') // ← USE THIS
      .then(res => res.json())
      .then(data => {
        const sorted = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setAnnouncements(sorted.slice(0, 5)); // Optionally limit to 5
      })
      .catch(err => console.error('Error fetching announcements:', err));
  }, []);

  const handleViewClick = () => {
    navigate('/mybookings');
  };

  return (
    <div className="home-tutee-container">
      <HeaderTutee />
      <SidebarTutee />

      <div className="welcome-container">
        <h1>Welcome back, Student!</h1>
        <p>Work smart, not harder</p>
      </div>

      <div className="home-tutoring-schedule-container">
        <h2>Upcoming Tutoring Schedule</h2>
        {tutorInfo ? (
          <div className="tutor-card">
            <div className="tutor-info">
              <span className="tutor-name">{tutorInfo.name}</span>
              <span className="tutor-role">Tutor</span>
            </div>
            <div className="tutor-subject">Subject: {tutorInfo.subject}</div>
            <button className="view-button" onClick={handleViewClick}>
              View
            </button>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>

      {/* Announcement Container */}
      <div className="tutee-announcement-container">
        <h3>Announcements</h3>
        <div className="announcement-list">
          {announcements.length > 0 ? (
            announcements.map((item) => (
              <div key={item.announcement_id} className="announcement-item">
                <p className="announcement-message">{item.message}</p>
                <p className="timestamp">
                  🕒 Posted on: {new Date(item.created_at).toLocaleString()}
                </p>
              </div>
            ))
          ) : (
            <p className="announcement-message">No announcements yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomeTutee;
