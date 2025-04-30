import React from 'react';
import HeaderTutee from './HeaderTutee'; 
import './CSS/MyBookings.css'; 


function MyBookings() {
  return (
    <div>
      <HeaderTutee />

      <div className="my-bookings-container">
        <h1>My Bookings</h1>
        <div className="filter-buttons">
          <button>Select year</button>
          <button>Select month</button>
        </div>
        <div className="bookings-grid">
          <div className="booking-card">
            <p><strong>Tutor Name:</strong></p>
            <p>Subject</p>
            <p>Date</p>
            <p>Duration</p>
            <p>Month</p>
            <p>Year</p>
          </div>
          <div className="booking-card">
            <p><strong>Tutor Name:</strong></p>
            <p>Subject</p>
            <p>Date</p>
            <p>Duration</p>
            <p>Month</p>
            <p>Year</p>
          </div>
          <div className="booking-card">
            <p><strong>Tutor Name:</strong></p>
            <p>Subject</p>
            <p>Date</p>
            <p>Duration</p>
            <p>Month</p>
            <p>Year</p>
          </div>
        </div>
        <div className="pagination">
          <button className="page-button active">1</button>
          <button className="page-button">2</button>
        </div>
      </div>
      
    </div>
  );
}

export default MyBookings;
