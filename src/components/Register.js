import React from "react";
import "./Register.css";

function Register() {
  return (
    <>
      <div className="bg-image"></div>
      <div className="register-container">
        <h1 className="Reg">Register</h1>
       
        <form>
          {/*Full name section */}
          <div className="input-group">
            <label>Full Name</label>
            <div className="row">
              <input type="text" placeholder="Last Name" />
              <input type="text" placeholder="First Name" />
              <input type="text" placeholder="Middle Name (Optional)" />
            </div>
          </div>
          {/*Birth date section */}
          <div className="input-group">
            <label>Birth Date</label>
            <div className="row">
              <input type="text" placeholder="Month" />
              <input type="text" placeholder="Day" />
              <input type="text" placeholder="Year" />
            </div>
          </div>
          {/*Gendersection */}
          <div className="input-group">
            <label>Gender</label>
            <select>
              <option>Please select</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
          {/*Email section */}
          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="Enter email" />
          </div>
          {/*Contact section */}
          <div className="input-group">
            <label>Contact Number</label>
            <input type="text" placeholder="63+ xxx xxx xxxx" />
          </div>
          {/*Address section */}
          <div className="input-group">
            <label>Address</label>
            <div className="row">
              <input type="text" placeholder="Town" />
              <input type="text" placeholder="Barangay" />
              <input type="text" placeholder="House Number" />
            </div>
          </div>

          <a href="/registerNext">
              <button type="button">Next</button>
          </a>
        </form>
        <p> <a href="/login"> Already have an account? Login</a></p>
      </div>
    </>
  );
}

export default Register;
