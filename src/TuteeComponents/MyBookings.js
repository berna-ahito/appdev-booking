import React, { useEffect, useState } from 'react';
import HeaderTutee from './HeaderTutee';
import './CSS/MyBookings.css';

function MyBookings() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear().toString();
  const currentMonth = currentDate.toLocaleString('en-US', { month: 'long' });

  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [isLoading, setIsLoading] = useState(true);

  // Use same key as HomeTutee for consistency
  const studentId = localStorage.getItem('student_id');

  useEffect(() => {
    if (!studentId) {
      console.error('No student_id found in localStorage');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    fetch('http://localhost:8080/booking/all')
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(data => {
        const studentBookings = data.filter(
          booking => booking.student?.student_id === parseInt(studentId)
        );
        setBookings(studentBookings);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Error fetching bookings:', err);
        setIsLoading(false);
      });
  }, [studentId]);

  useEffect(() => {
    const filtered = bookings.filter(booking => {
      const date = new Date(booking.sessionDateTime);
      if (isNaN(date.getTime())) return false;
      const year = date.getFullYear().toString();
      const month = date.toLocaleString('en-US', { month: 'long' });
      const yearMatch = selectedYear === 'All' || year === selectedYear;
      const monthMatch = selectedMonth === 'All' || month === selectedMonth;
      return yearMatch && monthMatch;
    });
    setFilteredBookings(filtered);
  }, [bookings, selectedYear, selectedMonth]);

  const getUniqueYears = () => {
    const years = bookings
      .map(b => {
        const date = new Date(b.sessionDateTime);
        return isNaN(date.getTime()) ? null : date.getFullYear();
      })
      .filter(year => year !== null);
    return ['All', ...new Set(years)];
  };

  const getUniqueMonths = () => {
    const months = bookings
      .map(b => {
        const date = new Date(b.sessionDateTime);
        return isNaN(date.getTime()) ? null : date.toLocaleString('en-US', { month: 'long' });
      })
      .filter(month => month !== null);
    return ['All', ...new Set(months)];
  };

  return (
    <div>
      <HeaderTutee />
      <div className="my-bookings-container">
        <h1>My Bookings</h1>

        {/* Filters */}
        <div className="filter-buttons">
          <select value={selectedYear} onChange={e => setSelectedYear(e.target.value)}>
            {getUniqueYears().map((year, idx) => (
              <option key={idx} value={year}>{year}</option>
            ))}
          </select>

          <select value={selectedMonth} onChange={e => setSelectedMonth(e.target.value)}>
            {getUniqueMonths().map((month, idx) => (
              <option key={idx} value={month}>{month}</option>
            ))}
          </select>
        </div>

        {/* Booking List */}
        <div className="bookings-grid">
          {isLoading ? (
            <p>Loading bookings...</p>
          ) : filteredBookings.length > 0 ? (
            filteredBookings.map((booking, index) => {
              const date = new Date(booking.sessionDateTime);
              const month = date.toLocaleString('en-US', { month: 'long' });
              const year = date.getFullYear();

              const tutorFirstName = booking.tutor?.student?.first_name || 'N/A';
              const tutorLastName = booking.tutor?.student?.last_name || '';

              return (
                <div className="booking-card" key={index}>
                  <p><strong>Tutor Name:</strong> {tutorFirstName} {tutorLastName}</p>
                  <p><strong>Subject:</strong> {booking.subject || 'N/A'}</p>
                  <p><strong>Date:</strong> {date.toLocaleDateString()}</p>
                  <p><strong>Time:</strong> {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                  <p><strong>Status:</strong> {booking.status || 'N/A'}</p>
                  <p><strong>Month:</strong> {month}</p>
                  <p><strong>Year:</strong> {year}</p>
                </div>
              );
            })
          ) : (
            <p>No bookings found for selected filters.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyBookings;
