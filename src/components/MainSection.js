import React from 'react';
import { Link } from 'react-router-dom';
import './MainSection.css';
import mainImage from '../images/Main.jpg';

function MainSection() {
  return (
    <section className="main-section">
      <div className="image-container">
        <img src={mainImage} alt="Empowering Education" />
      </div>

      <div className="content">
        <h1 className="main-title">Empower Students</h1>
        <div className="tagline">
          <h3>Learn</h3>
          <h3>Teach</h3>
          <h3>Succeed</h3>
          <h3>Together</h3>
        </div>
        <p className="description">
          Connect students who need academic support with peer tutors on campus.
          Simplify booking, scheduling, and payments, making learning more
          accessible and tutoring more rewarding.
        </p>
        <div className="buttons">
          <Link to="/login" className="btn login-btn">Login</Link>
          <Link to="/register" className="btn register-btn">Register</Link>
        </div>
      </div>
    </section>
  );
}

export default MainSection;