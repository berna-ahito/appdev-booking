import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/Login.css";

function Login({ setIsLoggedIn }) {
  const [role, setRole] = useState("admin");          // "admin" | "student" | "tutor"
  const [adminId, setAdminId] = useState("");
  const [username, setUsername] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [tutorEmail, setTutorEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ admin_id: adminId, name: username, password }),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      localStorage.setItem("admin_id", data.admin_id);
      localStorage.setItem("isLoggedIn", "true");
      setIsLoggedIn(true);
      navigate("/admin/home");
    } catch {
      setError("Invalid admin credentials");
    }
  };

  const handleStudentLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch("http://localhost:8080/student/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: studentEmail, password }),
    });
    if (!res.ok) {
      const errorData = await res.json();
      console.log("Error response from backend:", errorData); // Log error details
      throw new Error(errorData.message || "Invalid credentials");
    }
    await res.text();
    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
    navigate("/student/home");
  } catch (error) {
    setError(error.message);
  }
};


  const handleTutorLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/tutor/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: tutorEmail, password }),
      });
      if (!res.ok) throw new Error();
      await res.text();
      localStorage.setItem("isLoggedIn", "true");
      setIsLoggedIn(true);
      navigate("/tutor/home");
    } catch {
      setError("Invalid tutor credentials");
    }
  };

  return (
    <>
      <div className="bg-image"></div>
      <div className="login-container">
        <h1>
          {role === "admin"
            ? "Admin Login"
            : role === "student"
            ? "Student Login"
            : "Tutor Login"}
        </h1>

        {error && <p className="error-message">{error}</p>}

        <div className="switch-login">
          <button
            onClick={() => setRole("admin")}
            className={role === "admin" ? "active" : ""}
          >
            Admin
          </button>
          <button
            onClick={() => setRole("student")}
            className={role === "student" ? "active" : ""}
          >
            Student
          </button>
          <button
            onClick={() => setRole("tutor")}
            className={role === "tutor" ? "active" : ""}
          >
            Tutor
          </button>
        </div>

        {role === "admin" && (
          <form onSubmit={handleAdminLogin}>
            <input
              type="text"
              placeholder="Admin ID"
              value={adminId}
              onChange={(e) => setAdminId(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Login</button>
          </form>
        )}

        {role === "student" && (
          <form onSubmit={handleStudentLogin}>
            <input
              type="email"
              placeholder="Student Email"
              value={studentEmail}
              onChange={(e) => setStudentEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Login</button>
            <p>
              <a href="/register">New user?</a>
            </p>
          </form>
        )}

        {role === "tutor" && (
          <form onSubmit={handleTutorLogin}>
            <input
              type="email"
              placeholder="Tutor Email"
              value={tutorEmail}
              onChange={(e) => setTutorEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Login</button>
          </form>
        )}
      </div>
    </>
  );
}

export default Login;
