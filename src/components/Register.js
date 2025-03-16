import React from "react";
import "./Register.css"; 

function Register() {
  return (
    <>
    <div className="bg-image"> </div>
      <div className="register-container">
        <h1>Register</h1>
        <form>
          <input type="text" placeholder="Full Name" />
          <input type="email" placeholder="Email" />
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />
          <input type="password" placeholder="Confirm Password" />
          <button type="submit">Sign Up</button>
        </form>
        <p>Already have an account? <a href="/login">Login</a></p>
      </div>
   
    </>
    
  );
}

export default Register;
