import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './CSS/HeaderTutee.css';
import bellIcon from '../images/bellIcon.png';

function HeaderTutee() {
  const navigate = useNavigate(); // Initialize navigate function

  const handleFindTutorClick = () => {
    navigate('/tutee/find-tutor'); // Navigate to the Find Tutor page
  };

  return (
    <div className='student-header'>
      <h1 className='logo'>WILDTEACH</h1>
      <div className='header-right'>
        <img src={bellIcon} alt="Notifications" className='bell-icon' />
        <button className='find-tutor-button' onClick={handleFindTutorClick}>
          Find a Tutor
        </button>
      </div>
    </div>
  );
}

export default HeaderTutee;
