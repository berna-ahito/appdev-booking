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
      let requestBody = { email, password };
  
      switch (role) {
        case "admin":
          endpoint = "admin/login";
          break;
        case "tutee":
          endpoint = "student/login";
          break;
        case "tutor":
          endpoint = "tutor/login";
          break;
        default:
          setError("Unknown role or role not assigned.");
          return;
      }

      console.log("Role:", role);
      console.log("Sending to:", `http://localhost:8080/${endpoint}`);
      console.log("Request Body:", requestBody);


      const loginRes = await fetch(`http://localhost:8080/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });
  
      if (!loginRes.ok) {
        const errorText = await loginRes.text();  
        console.log("Login error response:", errorText);
        setError(`Login failed: ${errorText}`);
        return;
      }
  
      const responseData = await loginRes.json();
      console.log("Server response (JSON):", responseData);
  
      if (responseData.tutor_id) {
        localStorage.setItem("tutor_id", responseData.tutor_id);
        localStorage.setItem("student_id", responseData.student_id);  // Needed for profile management
      }
  
      // Handle other roles as well...
  
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
