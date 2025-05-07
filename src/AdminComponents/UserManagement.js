import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import HeaderAdmin from "./HeaderAdmin";
import "./CSS/UserManagement.css";

function UserManagement() {
  const [activeList, setActiveList] = useState("tutees");
  const [students, setStudents] = useState([]);

  // Utility: Get status overrides from localStorage
  const getStatusOverrides = () => {
    const stored = localStorage.getItem("statusOverrides");
    return stored ? JSON.parse(stored) : {};
  };

  // Utility: Save status overrides to localStorage
  const saveStatusOverride = (id, newStatus) => {
    const overrides = getStatusOverrides();
    overrides[id] = newStatus;
    localStorage.setItem("statusOverrides", JSON.stringify(overrides));
  };

  // Load students and apply overrides from localStorage
  useEffect(() => {
    fetch("http://localhost:8080/student/all")
      .then((res) => res.json())
      .then((data) => {
        const overrides = getStatusOverrides();
        const updatedData = data.map((student) => ({
          ...student,
          status: overrides[student.student_id] || student.status || "Active",
        }));
        setStudents(updatedData);
      })
      .catch((err) => {
        console.error("Failed to fetch students:", err);
      });
  }, []);

  // Modified handleStatusChange to show alert
  const handleStatusChange = (id, newStatus) => {
    const updatedStudents = students.map((student) =>
      student.student_id === id ? { ...student, status: newStatus } : student
    );
    setStudents(updatedStudents);
    saveStatusOverride(id, newStatus);

    // Show alert message
    const changedUser = students.find((s) => s.student_id === id);
    const fullName = `${changedUser.first_name} ${changedUser.middle_name || ""} ${changedUser.last_name}`;
    alert(`Status of ${fullName.trim()} has been changed to ${newStatus}.`);
  };

  const tutees = students.filter((s) => s.role === "Tutee");
  const tutors = students.filter((s) => s.role === "Tutor");
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
        </div>

        <div className="student-table-container">
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
                    <td>{`${user.first_name} ${user.middle_name || ""} ${user.last_name}`}</td>
                    <td>{user.course}</td>
                    <td>{user.contact_number}</td>
                    <td>{user.email}</td>
                    <td className="view-more">View More</td>
                    <td>
                      <select
                        className={`status-dropdown ${user.status?.toLowerCase() || "active"}`}
                        value={user.status || "Active"}
                        onChange={(e) => handleStatusChange(user.student_id, e.target.value)}
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="pagination">
          {[1, 2].map((num) => (
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
