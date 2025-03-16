import React from "react";
import "./Login.css"; 

function Login() {
  return (
    <>
      <div className="bg-image"></div> 
      <div className="login-container">
        <h1>Login</h1>
        <form>
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />
          <button type="submit">Login</button>
        </form>
        <p><a href="/register">New user?</a></p>
      </div>
    </>
  );
}

export default Login;
