import React, { useState, useEffect } from 'react';
import HeaderTutor from './HeaderTutor';
import './CSS/ProfileTutor.css';

function ProfileStudent() {
  const storedId = localStorage.getItem('student_id');
  const studentId = storedId ? parseInt(storedId) : null;

  const [isEditingUpper, setIsEditingUpper] = useState(false);
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [tutorData, setTutorData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    birth_date: '',
    contact_number: '',
    address: '',
    city: '',
    province: '',
    home_address: '',
    permanent_address: '',
    gender: '',
    course: '',
    role: '',
    username: '',
    year_level: '',
    profileImage: '', // camelCase for backend
  });

  const [storedData, setStoredData] = useState({});

  useEffect(() => {
    if (studentId) {
      fetch(`http://localhost:8080/student/getById/${studentId}`)
        .then((res) => res.json())
        .then((data) => {
          setTutorData({
            ...data,
            gender: data.gender || '',
            course: data.course || '',
            role: data.role || '',
            username: data.username || '',
            year_level: data.year_level || '',
            profileImage: data.profileImage || '',
          });
          setStoredData(data);
        })
        .catch((error) => console.error("Error fetching student data:", error));
    }
  }, [studentId]);

  const handlePasswordUpdate = async () => {
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match.");
      return;
    }

    if (!currentPassword || !newPassword) {
      alert("Please fill in all password fields.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/student/updatePassword`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId,
          oldPassword: currentPassword,
          newPassword
        }),
      });

      if (response.ok) {
        alert("Password updated successfully.");
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        const errorText = await response.text();
        alert("Failed to update password: " + errorText);
      }
    } catch (error) {
      alert("Error updating password: " + error.message);
    }
  };

  const handleUpperSectionSave = async () => {
    const updatedUpperData = {
      ...(tutorData.first_name !== storedData.first_name && { first_name: tutorData.first_name }),
      ...(tutorData.last_name !== storedData.last_name && { last_name: tutorData.last_name }),
      ...(tutorData.email !== storedData.email && { email: tutorData.email }),
    };

    if (Object.keys(updatedUpperData).length === 0) {
      alert("No changes made.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/student/update/${studentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUpperData),
      });

      if (response.ok) {
        alert("Profile updated successfully.");
        setIsEditingUpper(false);
      } else {
        const errorText = await response.text();
        alert("Failed to update profile: " + errorText);
      }
    } catch (error) {
      alert("Error updating profile: " + error.message);
    }
  };
  //SADLY SO LISUD E IMPLEMENT
  // const handleProfileImageChange = async (e) => {
  //   const file = e.target.files[0];
  //   if (!file) return;
  
  //   const formData = new FormData();
  //   formData.append('image', file);
  //   formData.append('studentId', studentId); 
  
  //   try {
  //     const response = await fetch(`http://localhost:8080/student/uploadWithImage/${studentId}`, {  
  //       method: 'PUT',
  //       body: formData,
  //     });
  
  //     if (response.ok) {
  //       const data = await response.json();
  //       setTutorData((prev) => ({ ...prev, profileImage: data.fileName }));  
  //       alert('Profile image updated successfully.');
  //     } else {
  //       const errorText = await response.text();
  //       alert('Failed to upload image: ' + errorText);
  //     }
  //   } catch (error) {
  //     alert('Error uploading image: ' + error.message);
  //   }
  // };
  
  

  const handlePersonalInfo = async () => {
    const formattedBirthDate = tutorData.birth_date
      ? new Date(tutorData.birth_date).toISOString().split('T')[0]
      : '';

    const updatedData = {
      ...(tutorData.birth_date !== storedData.birth_date && { birth_date: formattedBirthDate }),
      ...(tutorData.contact_number !== storedData.contact_number && { contact_number: tutorData.contact_number }),
      ...(tutorData.address !== storedData.address && { address: tutorData.address }),
    };

    if (Object.keys(updatedData).length === 0) {
      alert("No changes made.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/student/update/${studentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        alert("Personal information updated successfully.");
        setIsEditingPersonal(false);
      } else {
        const errorText = await response.text();
        alert("Failed to update personal information: " + errorText);
      }
    } catch (error) {
      alert("Error updating personal information: " + error.message);
    }
  };

  return (
    <div>
      <HeaderTutor />
      <h1 className="settings-h1">Profile</h1>

      {/* Upper Section */}
      <div className="Upper-section">
  <img
    src={
      tutorData.profileImage
        ? `http://localhost:8080/images/${tutorData.profileImage}`
        : require('../images/FemaleProfile.png')
    }
    alt="Profile"
    className="profile-img"
  />

        {/* {isEditingUpper && (
          <input
            type="file"
            accept="image/*"
            onChange={handleProfileImageChange}
            className="upload-input" // Optional: for styling
          />
        )} */}
        <div>
          {isEditingUpper ? (
            <>
              <input
                type="text"
                value={tutorData.first_name}
                onChange={(e) => setTutorData({ ...tutorData, first_name: e.target.value })}
              />
              <input
                type="text"
                value={tutorData.last_name}
                onChange={(e) => setTutorData({ ...tutorData, last_name: e.target.value })}
              />
              <input
                type="email"
                value={tutorData.email}
                onChange={(e) => setTutorData({ ...tutorData, email: e.target.value })}
              />
            </>
          ) : (
            <>
              <p className="Name">{`${tutorData.first_name} ${tutorData.last_name}`}</p>
              <p className="Email">{tutorData.email}</p>
            </>
          )}
        </div>

        <button
          className="edit-button"
          onClick={() => {
            if (isEditingUpper) handleUpperSectionSave();
            setIsEditingUpper(!isEditingUpper);
          }}
        >
          {isEditingUpper ? "Save" : "Edit"}
        </button>
      </div>


      {/* Personal Info */}
      <div className="middle-section">
        <div className="section-header">
          <h3>Personal Information</h3>
          <button className="edit-button" onClick={isEditingPersonal ? handlePersonalInfo : () => setIsEditingPersonal(!isEditingPersonal)}>
            {isEditingPersonal ? "Save" : "Edit"}
          </button>
        </div>

        <div className="info-grid">
          <div className="info-pair">
            <p className="label">Date of Birth</p>
            {isEditingPersonal ? (
              <input type="date" value={tutorData.birth_date} onChange={(e) => setTutorData({ ...tutorData, birth_date: e.target.value })} />
            ) : (
              <p className="value">{tutorData.birth_date}</p>
            )}
          </div>

          <div className="info-pair">
            <p className="label">Address</p>
            {isEditingPersonal ? (
              <input type="text" value={tutorData.address} onChange={(e) => setTutorData({ ...tutorData, address: e.target.value })} />
            ) : (
              <p className="value">{tutorData.address}</p>
            )}
          </div>

          <div className="info-pair">
            <p className="label">Phone</p>
            {isEditingPersonal ? (
              <input type="text" value={tutorData.contact_number} onChange={(e) => setTutorData({ ...tutorData, contact_number: e.target.value })} />
            ) : (
              <p className="value">{tutorData.contact_number}</p>
            )}
          </div>
        </div>
      </div>

      {/* Password Update */}
      <div className="lower-section">
        <div className="section-header">
          <h3>Privacy & Security</h3>
          <button className="edit-button" onClick={() => {
            if (isEditingPassword) handlePasswordUpdate();
            setIsEditingPassword(!isEditingPassword);
          }}>
            {isEditingPassword ? 'Save' : 'Edit'}
          </button>
        </div>

        <div className="privacy-grid">
          <div className="password-section">
            <h4 className="changePass">Change Password</h4>
            <p className="lblCurrent">Current Password</p>
            <input
              type="password"
              className="txtCurrent"
              placeholder="Enter Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              disabled={!isEditingPassword}
            />
            <p className="lblNew">New Password</p>
            <input
              type="password"
              className="txtNew"
              placeholder="Enter New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              disabled={!isEditingPassword}
            />
            <p className="lblConfirm">Confirm Password</p>
            <input
              type="password"
              className="txtConfirm"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={!isEditingPassword}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileStudent;
