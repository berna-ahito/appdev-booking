import React from 'react';
import { Link } from 'react-router-dom';
import './MainSection.css';
import mainImage from '../images/Main.jpg';

function MainSection() {
  return (
    <div className="main-section">
      <div className="image-container">
        <img src={mainImage} alt="wild teach" />
      </div>

      <div className="content">
        <h1>EMPOWER STUDENTS</h1>
        <h3>Learn</h3>
        <h3>Teach</h3>
        <h3>Succeed</h3>
        <h3>Together</h3>
        <p>
          Connects students who need academic support with peer tutors on campus.
          It simplifies booking, scheduling, and payments, making learning more
          accessible and tutoring more rewarding.
        </p>
        <div className="buttons-css">
          <Link to="/login" className="login-btn">Login</Link>
          <Link to="/register" className="register-btn">Register</Link>
        </div>
      </div>
    </div>
  );
}

export default MainSection;
