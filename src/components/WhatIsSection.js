import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CSS/WhatIsSection.css';

function WhatIsSection() {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="what-is-container">
      <div className="content-box">
        <h1>What is Wild Teach?</h1>
        <p className="justified-text">
          <b><i>Transforming Education, One Peer at a Time!</i></b> Wild Teach empowers students by connecting them with skilled peer tutors right on campus. 
          Get the personalized academic support you need, while tutors reinforce their skills and earn money.  <b>Convenient. Impactful. Rewarding.</b>  
          <br /> <br />
        </p>
        <p className="call-to-action-text"><b>Join Now and Be a Part of the Change!</b></p>
        <button className="call-to-action" onClick={handleRedirect}>
          Be Part of It
        </button>
      </div>
    </div>
  );
}

export default WhatIsSection;
