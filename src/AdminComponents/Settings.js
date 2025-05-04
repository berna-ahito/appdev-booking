import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import HeaderAdmin from './HeaderAdmin';
import './CSS/Settings.css';

function Settings() {
  // Fetch adminId from localStorage
  const storedId = localStorage.getItem('admin_id');
  const adminId = storedId ? parseInt(storedId) : null;
  console.log("Stored Admin ID:", storedId);

  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [adminData, setAdminData] = useState({
    name: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    if (!adminId) return;

    const fetchAdmin = async () => {
      try {
        const response = await fetch(`http://localhost:8080/admin/getAdmin/${adminId}`);
        if (response.ok) {
          const data = await response.json();
          setAdminData(data);
        } else {
          alert('Failed to fetch admin data.');
        }
      } catch (error) {
        console.error('Error fetching admin:', error);
        alert('An error occurred while fetching admin data.');
      }
    };

    fetchAdmin();
  }, [adminId]);

  const handleSaveInfo = async () => {
    try {
      const response = await fetch(`http://localhost:8080/admin/updateAdmin/${adminId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: adminData.name,
          email: adminData.email,
          password: adminData.password, // keep old password unchanged
        }),
      });

      if (response.ok) {
        const updated = await response.json();
        setAdminData(updated);
        setIsEditingInfo(false);
        alert("Information updated successfully!");
      } else {
        alert("Failed to update information.");
      }
    } catch (error) {
      console.error("Error updating admin:", error);
      alert("An error occurred.");
    }
  };

  const handlePasswordUpdate = async () => {
    if (newPassword !== confirmPassword) {
      alert("New and confirm passwords do not match.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/admin/updateAdmin/${adminId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: adminData.name,
          email: adminData.email,
          password: newPassword,
        }),
      });

      if (response.ok) {
        const updated = await response.json();
        alert("Password updated successfully!");
        setAdminData(updated);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setIsEditingPassword(false);
      } else {
        alert("Failed to update password.");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      alert("An error occurred.");
    }
  };

  return (
    <div>
      <Sidebar />
      <HeaderAdmin />
      <h1 className='settings-h1'>Settings</h1>

      <div className='Upper-section'>
        <img src={require('../images/FemaleProfile.png')} alt="Profile" className='profile-img' />
        <div>
          {isEditingInfo ? (
            <>
              <input
                className="edit-input"
                type="text"
                value={adminData.name}
                onChange={(e) => setAdminData({ ...adminData, name: e.target.value })}
              />
              <input
                className="edit-input"
                type="email"
                value={adminData.email}
                onChange={(e) => setAdminData({ ...adminData, email: e.target.value })}
              />
            </>
          ) : (
            <>
              <p className='Name'>{adminData.name}</p>
              <p className='Email'>{adminData.email}</p>
            </>
          )}
        </div>
        <button
          className='edit-button'
          onClick={() => {
            if (isEditingInfo) handleSaveInfo();
            setIsEditingInfo(!isEditingInfo);
          }}
        >
          {isEditingInfo ? 'Save' : 'Edit'}
        </button>
      </div>

      <div className='middle-section'>
        <div className="section-header">
          <h3>Personal Information</h3>
          <button
            className='edit-button'
            onClick={() => {
              if (isEditingInfo) handleSaveInfo();
              setIsEditingInfo(!isEditingInfo);
            }}
          >
            {isEditingInfo ? 'Save' : 'Edit'}
          </button>
        </div>
        <div className="info-grid">
          <div className="info-pair">
            <p className="label">Username</p>
            {isEditingInfo ? (
              <input
                className="edit-input"
                value={adminData.name}
                onChange={(e) => setAdminData({ ...adminData, name: e.target.value })}
              />
            ) : (
              <p className="value">{adminData.name}</p>
            )}
          </div>
          <div className="info-pair">
            <p className="label">Email</p>
            {isEditingInfo ? (
              <input
                className="edit-input"
                value={adminData.email}
                onChange={(e) => setAdminData({ ...adminData, email: e.target.value })}
              />
            ) : (
              <p className="value">{adminData.email}</p>
            )}
          </div>
        </div>
      </div>

      <div className='lower-section'>
        <div className="section-header">
          <h3>Privacy & Security</h3>
          <button
            className='edit-button'
            onClick={() => {
              if (isEditingPassword) handlePasswordUpdate();
              setIsEditingPassword(!isEditingPassword);
            }}
          >
            {isEditingPassword ? 'Save' : 'Edit'}
          </button>
        </div>

        <div className="privacy-grid">
          <div className="password-section">
            <h4 className='changePass'>Change Password</h4>
            <p className='lblCurrent'>Current Password</p>
            <input
              type="password"
              className='txtCurrent'
              placeholder='Enter Current Password'
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              disabled={!isEditingPassword}
            />
            <p className='lblNew'>New Password</p>
            <input
              type="password"
              className='txtNew'
              placeholder='Enter New Password'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              disabled={!isEditingPassword}
            />
            <p className='lblConfirm'>Confirm Password</p>
            <input
              type="password"
              className='txtConfirm'
              placeholder='Confirm New Password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={!isEditingPassword}
            />
          </div>

          <div className='vertical-divider'></div>

          <div className="visibility-section">
            <h4 className='lblManageVisibility'>Manage Visibility</h4>
            <p className='lblVisibility'>Who can see your profile?</p>
            <select className='txtVisibility' disabled={!isEditingPassword}>
              <option value="everyone">Everyone</option>
              <option value="friends">Friends</option>
              <option value="onlyMe">Only Me</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
