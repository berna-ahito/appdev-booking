import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import HeaderTutee from './HeaderTutee';
import SidebarTutee from './SidebarTutee';
import './CSS/FindTutor.css';

function FindTutor() {
  const [tutors, setTutors] = useState([]);
  const navigate = useNavigate();

  const handleBookNow = (tutor_id) => {
    navigate(`/tutee/book-tutor/${tutor_id}`);
  };

  useEffect(() => {
    fetch('http://localhost:8080/student/all')
      .then((res) => res.json())
      .then((data) => {
        const tutorList = data.filter((student) => student.role === 'Tutor');
        setTutors(tutorList);
      })
      .catch((err) => console.error('Error fetching tutors:', err));
  }, []);
  

  return (
    <div className="home-tutee-container">
      <HeaderTutee />

      <div className="find-tutor-container">
        <h1>Find a Tutor</h1>
        <p>Browse through all our tutors</p>
      </div>

      <div className="tutor-wrapper">
        <div className="tutoring-schedule-container">
          {tutors.length > 0 ? (
            <div className="all-tutors-wrapper">
              {tutors.map((tutor, index) => (
                <div key={tutor.student_id}>
                  <div className="find-tutor-card">
                      <div className="tutor-info">
                        <span className="tutor-name">
                          {`${tutor.first_name} ${tutor.middle_name || ''} ${tutor.last_name}`}
                        </span>
                        <span className="tutor-role">Status: {tutor.status || 'Active'}</span>
                      </div>

                      <div className="tutor-details-row">
                        <div className="tutor-details-text">
                          <div className="tutor-subject">Subjects: {tutor.subjects_offered || 'Not specified'}</div>
                          <div className="tutor-subject">Rate per Hour: ₱{tutor.rate_per_hour || 'N/A'}</div>
                          <div className="tutor-subject">Availability: {tutor.availability || 'Not set'}</div>
                        </div>
                        <div className="action-buttons">
                          <button
                            className="profile-button"
                            onClick={() => alert(`Viewing profile of ${tutor.first_name}`)}
                          >
                            View Profile
                          </button>
                          <button className="book-button" onClick={() => handleBookNow(tutor.student_id)}>Book Now</button>
                        </div>

                      </div>
                    </div>

                  {index !== tutors.length - 1 && <hr className="tutor-divider" />}
                </div>
              ))}
            </div>
          ) : (
            <p>No tutors available right now.</p>
          )}
        </div>
      </div>

    </div>
  );
}

export default FindTutor;
