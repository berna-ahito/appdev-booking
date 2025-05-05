import React from 'react';
import './CSS/AboutSection.css';
import bgImage from '../images/bgLanding.jpg';
import dev1 from '../images/bernaPic.jpg';
import dev2 from '../images/alivioPic.jpg';
import dev3 from '../images/juviePic.jpg';
import dev4 from '../images/kylePic.jpg';

function AboutSection() {
  return (
    <div className="about-wrapper">
      {/* Blurred background image */}
      <div
        className="about-bg"
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      />

      <div className="about-container">
      <section className="about-us">
  <div className="about-us-container">
    <h1>About Us</h1>
    <p>
      <strong>Wild Teach</strong> is a campus-based tutoring platform that connects students with <strong>skilled peer tutors</strong> for personalized academic support.
    </p>
    <p>
      We offer <strong>flexible scheduling</strong>, easy booking, and a space where students grow and tutors gain <strong>valuable experience</strong>.
    </p>
    <p>
      At our core, we value <strong>collaboration</strong>, <strong>accessibility</strong>, and a shared commitment to <strong>academic success</strong>.
    </p>
  </div>
</section>

        <section className="developer-cards">
          <h2>Meet Our Developers</h2>
          <div className="cards">
            <div className="card">
              <img src={dev1} alt="Bernadeth Claire G. Ahito" />
              <h3>Bernadeth Claire G. Ahito</h3>
              <p>Frontend Developer</p>
            </div>
            <div className="card">
              <img src={dev2} alt="Alyssa Blanche S. Alivio" />
              <h3>Alyssa Blanche S. Alivio</h3>
              <p>UI/UX Designer</p>
            </div>
            <div className="card">
              <img src={dev3} alt="Juvie R. Coca" />
              <h3>Juvie R. Coca</h3>
              <p>UI/UX Designer</p>
            </div>
            <div className="card">
              <img src={dev4} alt="Kyle E. Sepulveda" />
              <h3>Kyle E. Sepulveda</h3>
              <p>Backend Developer</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AboutSection;
