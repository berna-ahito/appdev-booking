import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import HeaderTutee from './HeaderTutee';
import './CSS/BookingPage.css';

function BookingPage() {
  const { tutorId } = useParams(); // from URL
  const [tutor, setTutor] = useState(null);
  const [subject, setSubject] = useState('');
  const [sessionDateTime, setSessionDateTime] = useState(new Date());

  const studentId = localStorage.getItem('student_id');
  console.log('Loaded studentId from localStorage:', studentId);

  useEffect(() => {
    fetch('http://localhost:8080/tutor/all')
      .then(res => res.json())
      .then(data => {
        console.log('Fetched tutors:', data);
  
        // Match tutor by student_id from URL if tutor_id is not used in route
        const foundTutor = data.find(t => t.student?.student_id === parseInt(tutorId));
        console.log('Found tutor:', foundTutor);
  
        setTutor(foundTutor);
      })
      .catch(err => console.error('Error fetching tutors:', err));
  }, [tutorId]);
  

  const handleBookingSubmit = (e) => {
    e.preventDefault();

    if (!studentId || !tutorId || !tutor) {
      alert('Missing required information. Make sure tutor is loaded.');
      return;
    }

    const bookingPayload = {
      student: { student_id: parseInt(studentId) },
      tutor: { tutor_id: tutor.tutor_id }, // From loaded tutor object
      subject,
      sessionDateTime,
      status: 'Pending',
    };
    

    console.log('Submitting booking with studentId:', studentId, 'tutorId:', tutorId);
    console.log('Booking Payload:', bookingPayload);

    fetch('http://localhost:8080/booking/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingPayload),
    })
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        console.log('Booking response:', res.status, data);

        if (res.ok) {
          alert('Booking successful!');
        } else {
          alert(`Booking failed: ${res.status} - ${data.message || 'Unknown error'}`);
        }
      })
      .catch((err) => console.error('Booking error:', err));
  };

  if (!tutor) return <div>Loading tutor information...</div>;

  return (
    <div className="home-tutee-container">
      <HeaderTutee />
      <div className="find-tutor-container">
        <h1>Request a Session</h1>
      </div>
      <div className="booking-page-container">
        <div className="booking-form-box">
          <div className="booking-heading">
          <h2>Book a Session with {tutor.student?.first_name} {tutor.student?.last_name}</h2>
          </div>
          <form onSubmit={handleBookingSubmit}>
            <label>Subject</label>
            <input
              type="text"
              className="subject-input"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />

            <label>Select Date & Time</label>
            <DatePicker
              selected={sessionDateTime}
              onChange={(date) => setSessionDateTime(date)}
              showTimeSelect
              timeFormat="h:mm aa"
              timeIntervals={30}
              dateFormat="MMMM d, yyyy h:mm aa"
            />

            <div className="form-actions">
              <button type="submit" className="confirm-book-button">Confirm Booking</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BookingPage;
