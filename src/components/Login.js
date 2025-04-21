import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/Login.css";

function Login({ setIsLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [admin_id, setAdminId] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          admin_id: admin_id,
          name: username,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login successful", data);

        localStorage.setItem("admin_id", data.admin_id);  
        localStorage.setItem("isLoggedIn", "true");
        console.log("Admin ID stored in localStorage:", data.admin_id);  
        setIsLoggedIn(true);

        navigate("/admin/home");
      } else {
        setError("Invalid username or password");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <div className="bg-image"></div>
      <div className="login-container">
        <h1>Login</h1>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
        <p><a href="/register">New user?</a></p>
      </div>
    </>
  );
}

export default Login;
