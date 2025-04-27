import React from 'react';
import './CSS/HeaderTutee.css';
import bellIcon from '../images/bellIcon.png'; // still in images folder

function HeaderTutee() {
  return (
    <div className='student-header'>
      <h1 className='logo'>WILDTEACH</h1>
      <div className='header-right'>
        <img src={bellIcon} alt="Notifications" className='bell-icon' />
        <button className='find-tutor-button'>Find a Tutor</button>
      </div>
    </div>
  );
}

export default HeaderTutee;
