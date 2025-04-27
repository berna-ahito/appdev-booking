import React from 'react';
import HeaderTutor from './HeaderTutor';
import SideBarTutor from './SideBarTutor';
import './CSS/ProfileTutor.css';

function ProfileTutor() {
  return (
    <div>
      <SideBarTutor />
      <HeaderTutor />

      <h1 className="settings-h1">Profile</h1>

      {/* Upper Section */}
      <div className="Upper-section">
        <img
          src={require('../images/FemaleProfile.png')}
          alt="Profile"
          className="profile-img"
        />
        <div>
          <p className="Name">Juan Cruz</p>
          <p className="Email">juanCruz@cit.edu</p>
        </div>
        <button className="edit-button">Edit</button>
      </div>

      {/* Middle Section */}
      <div className="middle-section">
        <div className="section-header">
          <h3>Personal Information</h3>
          <button className="edit-button">Edit</button>
        </div>

        <div className="info-grid">
          <div className="info-pair">
            <p className="label">Fullname</p>
            <p className="value">Juan Cruz</p>
          </div>
          <div className="info-pair">
            <p className="label">Date of Birth</p>
            <p className="value">April 04, 2001</p>
          </div>
          <div className="info-pair">
            <p className="label">Address</p>
            <p className="value">Cebu City</p>
          </div>
          <div className="info-pair">
            <p className="label">Email</p>
            <p className="value">juancruz@cit.edu</p>
          </div>
          <div className="info-pair">
            <p className="label">Phone</p>
            <p className="value">09123456789</p>
          </div>
        </div>
      </div>

      {/* Lower Section */}
      <div className="lower-section">
        <div className="section-header">
          <h3>Address</h3>
          <button className="edit-button">Edit</button>
        </div>

        <div className="address-grid">
          <div className="address-pair">
            <p className="label">City</p>
            <input type="text" className="value" />
          </div>
          <div className="address-pair">
            <p className="label">Province</p>
            <input type="text" className="value" />
          </div>
          <div className="address-pair">
            <p className="label">Home Address</p>
            <input type="text" className="value" />
          </div>
          <div className="address-pair">
            <p className="label">Permanent Address</p>
            <input type="text" className="value" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileTutor;
