import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import HeaderTutee from './HeaderTutee';
import SidebarTutee from './SidebarTutee';
import './CSS/BookingPage.css';

function BookingPage() {
  const { tutorId } = useParams(); // this is still passed from URL
  const [tutor, setTutor] = useState(null);
  const [subject, setSubject] = useState('');
  const [sessionDateTime, setSessionDateTime] = useState(new Date());

  const studentId = localStorage.getItem('studentId');

  useEffect(() => {
    fetch('http://localhost:8080/student/all')
      .then(res => res.json())
      .then(data => {
        // Find the tutor by matching student_id (since Book Now passes tutor_id)
        const foundTutor = data.find(student => 
          student.role === 'Tutor' && student.student_id === parseInt(tutorId)
        );
        setTutor(foundTutor);
      })
      .catch(err => console.error('Error fetching tutors:', err));
  }, [tutorId]);

  const handleBookingSubmit = (e) => {
    e.preventDefault();

    const bookingPayload = {
      student: { studentId: parseInt(studentId) },
      tutor: { tutorId: parseInt(tutorId) }, // backend expects tutorId
      subject,
      sessionDateTime,
      status: 'Pending'
    };

    fetch('http://localhost:8080/booking/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingPayload)
      })
        .then(async (res) => {
          const data = await res.json().catch(() => ({})); // safely parse JSON
          console.log('Booking response:', res.status, data);
      
          if (res.ok) {
            alert('Booking successful!');
          } else {
            alert(`Booking failed: ${res.status}`);
          }
        })
        .catch(err => console.error('Booking error:', err));
        };

  if (!tutor) return <div>Loading tutor information...</div>;

  return (
    <div className="home-tutee-container">
      <HeaderTutee />
      <SidebarTutee />
      <div className="find-tutor-container">
        <h1>Request a Session</h1>
      </div>
      <div className="booking-page-container"> 
        <div className="booking-form-box">
            <div className="booking-heading">
                <h2>Book a Session with {tutor.first_name} {tutor.last_name}</h2>
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
