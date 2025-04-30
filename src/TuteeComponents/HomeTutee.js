import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderTutee from './HeaderTutee';
import SidebarTutee from './SidebarTutee';
import './CSS/HomeTutee.css'; // Adjust the path if needed

function HomeTutee() {
  const [tutorInfo, setTutorInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch tutor data from your backend
    fetch('http://localhost:8080/api/tutor-schedule') // change URL to your actual endpoint
      .then(response => response.json())
      .then(data => setTutorInfo(data))
      .catch(error => console.error('Error fetching tutor info:', error));
  }, []);

  const handleViewClick = () => {
    navigate('/mybookings'); // Navigate to MyBookings.js
  };

  return (
    <div className="home-tutee-container">
      <HeaderTutee />

      {/* Welcome Container */}
      <div className="welcome-container">
        <h1>Welcome back, Student!</h1>
        <p>Work smart, not harder</p>
      </div>

      {/* Upcoming Tutoring Schedule Container */}
      <div className="tutoring-schedule-container">
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
    </div>
  );
}

export default HomeTutee;
