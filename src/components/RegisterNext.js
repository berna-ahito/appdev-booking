import React from "react";
import "./RegisterNext.css";

function Register() {
  return (
    <>
      <div className="bg-image1"></div>
      <div className="registerNext-container">
      <h1 className="profile-heading">Register</h1>

        <form>
          <div className="form-grid">
            {/* Left Column */}
            <div className="form-column">
              <div className="input-group1">
                <label>Username</label>
                <input type="text" placeholder="Username" />
              </div>

              <div className="input-group1">
                <label>Role</label>
                <select>
                  <option>Please select</option>
                  <option>Student</option>
                  <option>Tutor</option>
                </select>
              </div>

              <div className="input-group1">
                <label>Password</label>
                <input type="password" placeholder="Password" />
              </div>

              <div className="input-group1">
                <label>Confirmed</label>
                <input type="password" placeholder="Re-type password" />
              </div>
            </div>

            {/* Right Column */}
            <div className="form-column">
              <div className="input-group1">
                <label>Course</label>
                <input type="text" placeholder="Course" />
              </div>

              <div className="input-group1">
                <label>Year Level</label>
                <input type="text" placeholder="Year" />
              </div>

              <div className="input-group1">
                <label>Bio</label>
                <textarea placeholder="Bio"></textarea>
              </div>
            </div>
          </div>

          <button type="submit" className="submit-btn">Submit</button>
          <p> <a href="/login"> Already have an account? Login</a></p>
        </form>
      </div>
    </>
  );
}

export default Register;
