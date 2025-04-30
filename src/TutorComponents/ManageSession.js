import React, { useState, useEffect, useRef } from "react";
import SideBarTutor from "./SideBarTutor";
import HeaderTutor from "./HeaderTutor";
import "./CSS/ManageSession.css";

function DropdownButton({ label, options, selected, setSelected }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={`dropdown ${isOpen ? "open" : ""}`} ref={dropdownRef}>
      <button className="dropbtn" onClick={() => setIsOpen(!isOpen)}>
        {selected || label}
        <span className={`caret ${isOpen ? "rotate" : ""}`}>▼</span>
      </button>
      <div className="dropdown-content">
        {options.map((option, index) => (
          <a
            href="#!"
            key={index}
            onClick={() => {
              setSelected(option);
              setIsOpen(false);
            }}
          >
            {option}
          </a>
        ))}
      </div>
    </div>
  );
}

function ManageSession() {
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [sessions, setSessions] = useState([]);

  const years = Array.from({ length: 10 }, (_, i) => 2020 + i);
  const months = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
  ];

  // Fetch sessions based on selected year and month
  useEffect(() => {
    if (selectedYear && selectedMonth) {
      // Assuming your backend API supports filtering sessions by year and month
      fetch(`http://localhost:8080/api/sessions?year=${selectedYear}&month=${selectedMonth}`)
        .then(response => response.json())
        .then(data => setSessions(data))
        .catch(error => console.error("Error fetching sessions:", error));
    }
  }, [selectedYear, selectedMonth]);

  return (
    <div>
      <HeaderTutor />
      <SideBarTutor />

      <div className="manage-session-container">
        <div className="manage-session-content">
          <h2 className="manage-title">Manage Sessions</h2>

          <div className="manage-filters">
            <DropdownButton
              label="Select Year"
              options={years}
              selected={selectedYear}
              setSelected={setSelectedYear}
            />
            <DropdownButton
              label="Select Month"
              options={months}
              selected={selectedMonth}
              setSelected={setSelectedMonth}
            />
          </div>

          <div className="session-cards">
            {sessions.length > 0 ? (
              sessions.map((session, index) => (
                <div key={index} className="session-card">
                  <p><strong>Student Name:</strong> {session.studentName}</p>
                  <p><strong>Subject:</strong> {session.subject}</p>
                  <p><strong>Date:</strong> {session.date}</p>
                  <p><strong>Duration:</strong> {session.duration}</p>
                  <div className="card-btn-group">
                    <button className="card-btn btn-edit">Edit</button>
                    <button className="card-btn btn-cancel">Cancel</button>
                  </div>
                </div>
              ))
            ) : (
              <p>No sessions available for the selected year and month.</p>
            )}
          </div>

          <div className="pagination">
            <button className="page-btn active">1</button>
            <button className="page-btn">2</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageSession;
