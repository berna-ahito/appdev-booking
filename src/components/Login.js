import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/Login.css";

function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); 

    try {
      const roleRes = await fetch(
        `http://localhost:8080/api/users/role?email=${encodeURIComponent(email)}`
      );

      if (!roleRes.ok) {
        setError("Email not found or server error.");
        return;
      }

      const roleRaw = await roleRes.text();
      const role = roleRaw.trim().toLowerCase();

      let endpoint = "";
      let requestBody = {};

      switch (role) {
        case "admin":
          endpoint = "admin/login";
          requestBody = { email, password };
          break;
        case "tutee":
          endpoint = "student/login";
          requestBody = { email, password };
          break;
        case "tutor":
          endpoint = "tutor/login";
          requestBody = { email, password };
          break;
        default:
          setError("Unknown role or role not assigned.");
          return;
      }
      //debugging
      console.log("Role:", role);
      console.log("Sending to:", `http://localhost:8080/${endpoint}`);
      console.log("Request Body:", requestBody);

      const loginRes = await fetch(`http://localhost:8080/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      if (loginRes.status === 401) {
        setError("Unauthorized: Invalid email or password.");
        return;
      }

      if (!loginRes.ok) {
        setError("Login failed. Please try again.");
        return;
      }

      const message = await loginRes.text();
      console.log("Server response:", message);
      

      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("role", role);

      navigate(`/${role}/home`);
    } catch (err) {
      console.error("Login error:", err);
      setError("Server error. Please try again later.");
    }
  };

  return (
    <>
      <div className="bg-image"></div>
      <div className="login-container">
        <h1>Login</h1>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <p><a href="/register">New user? Register here</a></p>
      </div>
    </>
  );
}

export default Login;
