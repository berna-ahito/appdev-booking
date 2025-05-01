import React, {useState} from 'react'
import HeaderTutor from './HeaderTutor'
import './CSS/SettingsTutor.css'
function SettingsTutor() {
    const [emailNotif, setEmailNotif] = useState(false);
    const [sessionAlert, setSessionAlert] = useState(false);
  return (
  
    <div>
       <HeaderTutor />
       <h1 className='settings'>Settings</h1>
       <div className=" middle-section">
        <div className="section-header">
          <h3>Personal Information</h3>
        
        </div>

        <div className="card-content notification">
            <div className="toggle-row">
              <span>Email Notifications</span>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={emailNotif}
                  onChange={() => setEmailNotif(!emailNotif)}
                />
                <span className="slider round"></span>
              </label>
            </div>
            <div className="toggle-row">
              <span>Session Alerts</span>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={sessionAlert}
                  onChange={() => setSessionAlert(!sessionAlert)}
                />
                <span className="slider round"></span>
              </label>
            </div>
        </div>   
      </div>

      <div className='lower-section'>
          <div className="card-header">
            <h3>Booking & Session Preferences</h3>
          </div>
          <div className="card-content booking">
            <div className="availability">
              <p>Tutor Availability</p>
              <p>days</p>
              <div className="days">
                {['M', 'T', 'W', 'TH', 'F'].map(day => (
                  <button key={day} className="day-button">{day}</button>
                ))}
              </div>
              <p>Time</p>
              <div className="time">
                <input type="number" defaultValue={3} min="1" max="12" />
                <span>:</span>
                <input type="number" defaultValue={30} min="0" max="59" />
              </div>
            </div>
          </div>
      </div>
   </div>
  )
}

export default SettingsTutor
