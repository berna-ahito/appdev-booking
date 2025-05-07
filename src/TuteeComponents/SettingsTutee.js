import React, { useState, useEffect } from 'react';
import HeaderTutee from './HeaderTutee';
import './CSS/SettingsTutee.css';

function SettingsTutee() {
  const [emailNotif, setEmailNotif] = useState(false);
  const [sessionAlert, setSessionAlert] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [tutorData, setTutorData] = useState({
    tutor_id: '',
    approvalStatus: '',
    availability: [],
    rate_per_hour: '',
    subjects_offered: '',
    student: {
      student_id: ''
    }
  });

  const tutorId = localStorage.getItem('tutor_id');

  useEffect(() => {
    if (!tutorId) {
      console.error("No tutor ID found in localStorage");
      return;
    }

    const fetchTutorData = async () => {
      try {
        const res = await fetch(`http://localhost:8080/tutor/getById/${tutorId}`);
        if (!res.ok) throw new Error("Failed to fetch tutor data");

        const data = await res.json();
        console.log("Fetched tutor data:", data); // Debug log
        
        // If availability is a string, convert it to an array
        let availability;
        if (typeof data.availability === 'string') {
          // Handle case where availability might be a single string
          availability = [data.availability];
        } else if (Array.isArray(data.availability)) {
          // Filter out any unexpected values, keep only valid day codes
          availability = data.availability.filter(day => 
            ['M', 'T', 'W', 'TH', 'F'].includes(day));
        } else {
          availability = [];
        }
        
        setTutorData({
          tutor_id: data.tutor_id || '',
          approvalStatus: data.approvalStatus || '',
          availability: availability,
          rate_per_hour: data.rate_per_hour || '',
          subjects_offered: data.subjects_offered || '',
          student: {
            student_id: data.student?.student_id || ''
          }
        });
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchTutorData();
  }, [tutorId]);

  const toggleDay = (day) => {
    setTutorData(prev => {
      // Ensure availability is always an array
      const currentAvailability = Array.isArray(prev.availability) ? prev.availability : [];
      
      const updated = currentAvailability.includes(day)
        ? currentAvailability.filter(d => d !== day)
        : [...currentAvailability, day];
      
      return { ...prev, availability: updated };
    });
  };

  const savePreferences = async () => {
    try {
      // Convert rate_per_hour to a number if it's not already
      const rateAsNumber = parseFloat(tutorData.rate_per_hour);
      
      // Clean up availability to only include valid days
      const validDays = tutorData.availability.filter(day => 
        ['M', 'T', 'W', 'TH', 'F'].includes(day));
      
      // Based on the error message, the backend might be expecting a string
      // instead of an array for availability
      const availabilityString = validDays.join(",");
      
      const payload = {
        tutor_id: parseInt(tutorData.tutor_id),
        approvalStatus: tutorData.approvalStatus,
        availability: availabilityString, // Send as a comma-separated string
        rate_per_hour: rateAsNumber,
        subjects_offered: tutorData.subjects_offered,
        student: {
          student_id: parseInt(tutorData.student.student_id)
        }
      };
      
      console.log("Sending payload:", payload);
    
      const res = await fetch(`http://localhost:8080/tutor/update/${tutorId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    
      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        console.error("Server response:", errorData);
        throw new Error(`Failed to update preferences: ${res.status}`);
      }
      
      alert("Preferences updated successfully!");
    } catch (err) {
      console.error("Update error:", err);
      alert(`Error updating preferences: ${err.message}`);
    }
  };
  
  return (
    <div>
      <HeaderTutee />
      <h1 className="settings-tutee">Settings</h1>

      {/* Personal Notification Section */}
      <div className="middle-section">
        <div className="section-header">
          <h3>Personal Information</h3>
        </div>

        <div className="card-content notification">
          <div className="toggle-row">
            <span>Email Notifications</span>
            <label className="switch">
              <input
                type="checkbox"
                checked={emailNotif}
                onChange={() => setEmailNotif(!emailNotif)}
              />
              <span className="slider round"></span>
            </label>
          </div>
          <div className="toggle-row">
            <span>Session Alerts</span>
            <label className="switch">
              <input
                type="checkbox"
                checked={sessionAlert}
                onChange={() => setSessionAlert(!sessionAlert)}
              />
              <span className="slider round"></span>
            </label>
          </div>
        </div>
      </div>

      {/* Booking Preferences Section
      <div className='lower-section'>
        <div className="card-header">
          <h3>Booking & Session Preferences</h3>
        </div>
        <button className="edit-button" onClick={() => setShowModal(true)}>
              Save Preferences
        </button>
        <div className="card-content booking">
          <div className="availability">
            <p>Tutor Availability</p>
            <p>Days</p>
            <div className="days">
              {['M', 'T', 'W', 'TH', 'F'].map(day => (
                <button
                  key={day}
                  className={`day-button ${tutorData.availability.includes(day) ? 'active' : ''}`}
                  onClick={() => toggleDay(day)}
                >
                  {day}
                </button>
              ))}
            </div> */}

            {/* <p>Rate per Hour (₱)</p>
            <input className="rate-input"
              type="number"
              value={tutorData.rate_per_hour}
              onChange={(e) =>
                setTutorData({ ...tutorData, rate_per_hour: e.target.value })
              }
              placeholder="Enter rate"
            />

            <p>Subjects Offered</p>
            <input className="subject-input"
              type="text"
              value={tutorData.subjects_offered}
              onChange={(e) =>
                setTutorData({ ...tutorData, subjects_offered: e.target.value })
              }
              placeholder="Enter subjects"
            />

         
          </div>
        </div>
      </div> */}

      {/* Confirmation Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Confirm Update</h3>
            <p>Are you sure you want to save your preferences?</p>
            <div className="modal-buttons">
              <button className="confirm" onClick={() => { savePreferences(); setShowModal(false); }}>Yes</button>
              <button className="cancel" onClick={() => setShowModal(false)}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SettingsTutee;