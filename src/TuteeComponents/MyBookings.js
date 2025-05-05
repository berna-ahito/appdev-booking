import React, { useEffect, useState } from 'react';
import HeaderTutee from './HeaderTutee'; 
import './CSS/MyBookings.css'; 

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);

  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedMonth, setSelectedMonth] = useState('All');

  const studentId = localStorage.getItem('studentId');

  useEffect(() => {
    fetch(`http://localhost:8080/booking/student/${studentId}`)
      .then(res => res.json())
      .then(data => {
        setBookings(data);
        setFilteredBookings(data);
      })
      .catch(err => console.error('Error fetching bookings:', err));
  }, [studentId]);

  const getUniqueYears = () => {
    const years = bookings.map(booking => new Date(booking.sessionDateTime).getFullYear());
    return [...new Set(years)];
  };

  const getUniqueMonths = () => {
    const months = bookings.map(booking => 
      new Date(booking.sessionDateTime).toLocaleString('default', { month: 'long' })
    );
    return [...new Set(months)];
  };

  const handleFilter = (year, month) => {
    let filtered = bookings;

    if (year !== 'All') {
      filtered = filtered.filter(b => new Date(b.sessionDateTime).getFullYear().toString() === year);
    }
    if (month !== 'All') {
      filtered = filtered.filter(b => 
        new Date(b.sessionDateTime).toLocaleString('default', { month: 'long' }) === month
      );
    }

    setFilteredBookings(filtered);
  };

  const handleYearChange = (e) => {
    const year = e.target.value;
    setSelectedYear(year);
    handleFilter(year, selectedMonth);
  };

  const handleMonthChange = (e) => {
    const month = e.target.value;
    setSelectedMonth(month);
    handleFilter(selectedYear, month);
  };

  return (
    <div>
      <HeaderTutee />

      <div className="my-bookings-container">
        <h1>My Bookings</h1>

        {/* 🔥 Functional Filter Dropdowns */}
        <div className="filter-buttons">
          <select value={selectedYear} onChange={handleYearChange}>
            <option value="All">All Years</option>
            {getUniqueYears().map((year, idx) => (
              <option key={idx} value={year}>{year}</option>
            ))}
          </select>

          <select value={selectedMonth} onChange={handleMonthChange}>
            <option value="All">All Months</option>
            {getUniqueMonths().map((month, idx) => (
              <option key={idx} value={month}>{month}</option>
            ))}
          </select>
        </div>

        <div className="bookings-grid">
          {filteredBookings.map((booking, index) => {
            const date = new Date(booking.sessionDateTime);
            const month = date.toLocaleString('default', { month: 'long' });
            const year = date.getFullYear();

            return (
              <div className="booking-card" key={index}>
                <p><strong>Tutor Name:</strong> {booking.tutor.student.firstName} {booking.tutor.student.lastName}</p>
                <p><strong>Subject:</strong> {booking.subject}</p>
                <p><strong>Date:</strong> {date.toLocaleDateString()}</p>
                <p><strong>Time:</strong> {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                <p><strong>Month:</strong> {month}</p>
                <p><strong>Year:</strong> {year}</p>
              </div>
            );
          })}
        </div>

        {/* (Pagination still hardcoded for now) */}
        <div className="pagination">
          <button className="page-button active">1</button>
          <button className="page-button">2</button>
        </div>
      </div>
    </div>
  );
}

export default MyBookings;
