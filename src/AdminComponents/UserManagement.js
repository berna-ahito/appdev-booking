import React, { useState } from "react";
import Sidebar from "./Sidebar";
import HeaderAdmin from "./HeaderAdmin";

import "./CSS/UserManagement.css";

function UserManagement() {
  const [activeList, setActiveList] = useState("tutees");

  const tutees = [
    { name: "Tutee One", course: "BSIT", phone: "09123456789", email: "tutee1@email.com", status: "Active" },
  ];

  const tutors = [
    { name: "Tutor One", course: "BSCS", phone: "09987654321", email: "tutor1@email.com", status: "Inactive" },
  ];

  const users = activeList === "tutees" ? tutees : tutors;

  return (
    <div className="user-management-container">
      <Sidebar />
      <HeaderAdmin />
      <div className="user-management-content">

        <div className="header-box">
          <h1>User Management</h1>
        </div>

        <div className="top-controls">
          <div className="button-group">
            <button
              className={`view-button ${activeList === "tutees" ? "active" : ""}`}
              onClick={() => setActiveList("tutees")}
            >
              Tutees List
            </button>
            <button
              className={`view-button ${activeList === "tutors" ? "active" : ""}`}
              onClick={() => setActiveList("tutors")}
            >
              Tutors List
            </button>
          </div>

          <div className="search-sort">
            <select className="sort-select">
              <option>Sort by: Newest</option>
              <option>Sort by: Oldest</option>
            </select>
            <input type="text" placeholder="Search" className="search-input" />
          </div>
        </div>

        <div className="table-container">
          <table className="user-table">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Course</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th>More</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="6" className="no-data">No users found.</td>
                </tr>
              ) : (
                users.map((user, idx) => (
                  <tr key={idx}>
                    <td>{user.name}</td>
                    <td>{user.course}</td>
                    <td>{user.phone}</td>
                    <td>{user.email}</td>
                    <td className="view-more">View More</td>
                    <td>
                      <span className={`status ${user.status.toLowerCase()}`}>{user.status}</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="pagination">
          {[1, 2, 3, 4, 5].map((num) => (
            <button key={num} className={`page-button ${num === 1 ? "active" : ""}`}>
              {num}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserManagement;
