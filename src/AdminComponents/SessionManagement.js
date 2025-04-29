import React from "react";
import Sidebar from "./Sidebar";
import HeaderAdmin from "./HeaderAdmin";
import "./CSS/SessionManagement.css";

const sessions = [
  {
    id: 101,
    student: "Kristin Watson",
    tutor: "Manny Floyd",
    subject: "Basics of Programming",
    datetime: "03-29-2025 2:00 PM",
    status: "Pending",
  },
  {
    id: 102,
    student: "Kristin Watson",
    tutor: "James Bond",
    subject: "Object Oriented Programming",
    datetime: "03-29-2025 4:00 PM",
    status: "Pending",
  },
  {
    id: 103,
    student: "Jacob Jones",
    tutor: "James Bond",
    subject: "Object Oriented Programming",
    datetime: "03-29-2025 3:00 PM",
    status: "Cancelled",
  },
  {
    id: 104,
    student: "Marvin McKinney",
    tutor: "Emma Sonwats",
    subject: "Data Structures",
    datetime: "03-31-2025 2:00 PM",
    status: "Accepted",
  },
  {
    id: 105,
    student: "Marvin McKinney",
    tutor: "Emma Sonwats",
    subject: "Networking",
    datetime: "03-31-2025 3:00 PM",
    status: "Accepted",
  },
  {
    id: 106,
    student: "Marvin McKinney",
    tutor: "Emma Sonwats",
    subject: "Data Structures",
    datetime: "04-01-2025 2:00 PM",
    status: "Cancelled",
  },
];

const SessionManagement = () => {
    return (
      <div className="main-layout">
        <Sidebar />
        <div className="content-area">

          <HeaderAdmin />
          <div className="session-container">
            <h2>Session Management</h2>
            </div>

            <div className="status-cards">
              <div className="card-yellow">
                <h3>4</h3>
                <p>Active Sessions</p>
              </div>
              <div className="card-yellow">
                <h3>2</h3>
                <p>Pending Sessions</p>
              </div>
              <div className="card-yellow">
                <h3>2</h3>
                <p>Cancelled Sessions</p>
              </div>
            </div>
  
            <div className="session-filters">
              <button className="btn-see">See All 
              </button>
              <button className="btn-date-range">
                Date: Mar 29 - April 1, 2025
              </button>
            </div>
  
            <div className="table-container">
            <table className="session-table">
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Student Name</th>
                  <th>Tutor Name</th>
                  <th>Subject</th>
                  <th>Session Date & Time</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {sessions.map((session) => (
                  <tr key={session.id}>
                    <td>{session.id}</td>
                    <td>{session.student}</td>
                    <td>{session.tutor}</td>
                    <td>{session.subject}</td>
                    <td>{session.datetime}</td>
                    <td className={`status ${session.status.toLowerCase()}`}>
                      {session.status}
                    </td>
                    <td className="action-icons">
                      <span className="accept">✔️</span>
                      <span className="decline">❌</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };
  export default SessionManagement;
