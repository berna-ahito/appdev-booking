 import React from 'react'
 import Sidebar from './Sidebar'
 import HeaderAdmin from './HeaderAdmin'
 import './CSS/Settings.css'
 
 function Settings() {
   return (
     <div>
         <Sidebar/>
         <HeaderAdmin/>
         <h1 className='settings-h1'>Settings</h1>
         <div className='Upper-section'>
         <img src={require('../images/FemaleProfile.png')} alt="Profile" className='profile-img' />  
             <div>
              <p className='Name'>Juan Cruz</p>
              <p className='Email'>juanCruz@cit.edu</p>
             </div>
             <button className='edit-button'>Edit</button>
         </div>
         
 <div className='middle-section'> 
     <div className="section-header">
         <h3>Personal Information</h3>
         <button className='edit-button'>Edit</button>
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
         <div className='lower-section'> 
     <div className="section-header">
         <h3>Privacy & Security</h3>
         <button className='edit-button'>Edit</button>
        
     </div>
     <div className="privacy-grid">
         <div className="password-section">
             <h4 className='changePass'>Change Password</h4>
             <p className='lblCurrent'>Current Password</p>
             <input type="password" className='txtCurrent' placeholder='Enter Current Password' />
             <p className='lblNew'>New Password</p>
             <input type="password" className='txtNew' placeholder='Enter New Password' />
             <p className='lblConfirm'>Confirm Password</p>
             <input type="password" className='txtConfirm' placeholder='Confirm New Password' />
         </div>
         <div className='vertical-divider'></div>
         <div className="visibility-section">
             <h4 className='lblManageVisibility'>Manage Visibility</h4>
             <p className='lblVisibility'>Who can see your profile?</p>
             <select className='txtVisibility'>
                 <option value="everyone">Everyone</option>
                 <option value="friends">Friends</option>
                 <option value="onlyMe">Only Me</option>
             </select>
         </div>
          </div>
         </div>
     </div>
   )
 }
 
 export default Settings