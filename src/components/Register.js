import React, { useState } from "react";
import "./CSS/Register.css";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    last_name: "",
    first_name: "",
    middle_name: "",
    month: "",
    day: "",
    year: "",
    gender: "",
    email: "",
    contact_number: "",
    address: "",
    town: "",
    barangay: "",
    house_number: "",
    username: "",
    course: "",
    year_level: "",
    role: "",
    password: "",
    bio: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((fd) => ({ ...fd, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.first_name || !formData.last_name || !formData.email || !formData.password) {
      alert("Please fill in all required fields.");
      return;
    }

    // Build student payload
    const formattedDate =
      `${formData.year.padStart(4, "0")}-${formData.month.padStart(2, "0")}-${formData.day.padStart(2, "0")}`;
    const formattedAddress = `${formData.house_number}, ${formData.barangay}, ${formData.town}`;
    const studentPayload = {
      ...formData,
      birth_date: formattedDate,
      address: formattedAddress,
    };

    try {
      // 1️⃣ Create student and retrieve ID
      const studentRes = await fetch("http://localhost:8080/student/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(studentPayload),
      });

      const student_id = await studentRes.json();
      if (!studentRes.ok) {
        throw new Error(`Student creation failed: HTTP ${studentRes.status}`);
      }
      console.log("New student ID:", student_id);

      // 2️⃣ If role is Tutor, create tutor profile
      if (formData.role === "Tutor") {
        const tutorPayload = {
          student_id: student_id,
          approval_status: "Pending",
          availability: null,
          rate_per_hour: null,
          subjects_offered: null,
        };
        console.log("Tutor Payload:", tutorPayload);

        const tutorRes = await fetch("http://localhost:8080/tutor/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(tutorPayload),
        });

        const tutorText = await tutorRes.text();
        if (!tutorRes.ok) {
          throw new Error(`Tutor creation failed: ${tutorText}`);
        }
        console.log("Tutor profile created:", tutorText);
      }

      alert("Registration successful!");
      navigate("/login");
    } catch (err) {
      console.error("Fetch Error:", err);
      alert("Registration failed. " + err.message);
    }
  };

  return (
    <>
      <div className="bg-image"></div>
      <div className="register-container">
        <h1 className="Reg">Register</h1>

        <form className="scrollable-form" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="input-group">
            <label>Full Name</label>
            <div className="row">
              <input
                type="text"
                placeholder="Last Name"
                name="last_name"
                onChange={handleChange}
                required
              />
              <input
                type="text"
                placeholder="First Name"
                name="first_name"
                onChange={handleChange}
                required
              />
              <input
                type="text"
                placeholder="Middle Name (Optional)"
                name="middle_name"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Birth Date */}
          <div className="input-group">
            <label>Birth Date</label>
            <div className="row">
              <input
                type="number"
                placeholder="Month (01-12)"
                name="month"
                onChange={handleChange}
                min="1"
                max="12"
                required
              />
              <input
                type="number"
                placeholder="Day (01-31)"
                name="day"
                onChange={handleChange}
                min="1"
                max="31"
                required
              />
              <input
                type="number"
                placeholder="Year (YYYY)"
                name="year"
                onChange={handleChange}
                min="1900"
                max="2025"
                required
              />
            </div>
          </div>

          {/* Gender */}
          <div className="input-group">
            <label>Gender</label>
            <select name="gender" onChange={handleChange} required>
              <option value="">Please select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Email & Contact */}
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter email"
              name="email"
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label>Contact Number</label>
            <input
              type="tel"
              placeholder="+63 xxx xxx xxxx"
              name="contact_number"
              onChange={handleChange}
            />
          </div>

          {/* Address */}
          <div className="input-group">
            <label>Address</label>
            <div className="row">
              <input
                type="text"
                placeholder="Town"
                name="town"
                onChange={handleChange}
                required
              />
              <input
                type="text"
                placeholder="Barangay"
                name="barangay"
                onChange={handleChange}
                required
              />
              <input
                type="text"
                placeholder="House Number"
                name="house_number"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Username & Role */}
          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="Username"
              name="username"
                onChange={handleChange}
                required
              />
          </div>
          <div className="input-group">
            <label>User Role</label>
            <select name="role" onChange={handleChange} required>
              <option value="">Please select</option>
              <option value="Tutee">Tutee</option>
              <option value="Tutor">Tutor</option>
            </select>
          </div>

          {/* Password */}
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Re-type password"
              required
            />
          </div>

          {/* Course & Year Level */}
          <div className="input-group">
            <label>Course</label>
            <input
              type="text"
              placeholder="Course"
              name="course"
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label>Year Level</label>
            <input
              type="number"
              placeholder="Year Level"
              name="year_level"
              onChange={handleChange}
              min="1"
              max="5"
            />
          </div>

          {/* Bio */}
          <div className="input-group">
            <label>Bio</label>
            <textarea
              placeholder="Bio"
              name="bio"
              onChange={handleChange}
            ></textarea>
          </div>

          <button type="submit" className="submit-btn">Submit</button>
          <p>
            <a href="/login">Already have an account? Login</a>
          </p>
        </form>
      </div>
    </>
  );
}

export default Register;
