import React from "react";
import "./CSS/ProfileTutee.css";

const ProfileTutee = () => {
  return (
    <div className="main-layout">
    <div className="content-area">
    
    <div className="profile-container">
      <div className="sidebar"></div>
      <div className="main-content">
        <header className="header">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
          <h1>WILDTEACH</h1>
          <div className="header-right">
            <i className="fa-solid fa-bell bell-icon"></i>
            <button className="tutor-btn">Find a Tutor</button>
          </div>
        </header>
        

        <h2 className="section-title">Profile</h2>

        <div className="card-profile">
          <div className="profile-summary">
            <div className="avatar">
            <i class="fa-solid fa-user"></i>
            </div>
            <div className="info">
              <p input="name">John Doe</p>
              <p input="email">johndoe@cit.edu</p>
            </div>
            <button className="edit-btn">Edit</button>
          </div>
        </div>

        <div className="card-profile">
          <div className="card-header">
            <h3>Personal Information</h3>
            <button className="edit-btn">Edit</button>
          </div>
          <div className="form-grid">
            <label>Fullname: <input type="text" placeholder="John Doe"/></label>
            <label>Date of Birth: <input type="text" placeholder="April 04, 2001"/></label>
            <label>Address: <input type="text" placeholder="Cebu City"/></label>
            <label>Email: <input type="text" placeholder="johndoe@cit.edu"/></label>
            <label>Phone: <input type="text" placeholder="09123456789"/></label>
          </div>
        </div>

        <div className="card-profile">
          <div className="card-header">
            <h3>Address</h3>
            <button className="edit-btn">Edit</button>
          </div>
          <div className="form-grid">
            <label>City: <input type="text" /></label>
            <label>Home Address: <input type="text" /></label>
            <label>Province: <input type="text" /></label>
            <label>Permanent Address: <input type="text" /></label>
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
};

export default ProfileTutee;
