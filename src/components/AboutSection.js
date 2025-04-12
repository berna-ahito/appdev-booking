import React from 'react';
import './CSS/AboutSection.css';
import dev1 from '../images/bernaPic.jpg';
import dev2 from '../images/alivioPic.jpg';
import dev3 from '../images/juviePic.jpg';
import dev4 from '../images/kylePic.jpg';


function AboutSection() {
  return (
    <div className="about-container">
      <section className="about-content">
        <h1>About Us</h1>
        <p>
          Wild Teach is a web-based tutoring appointment system designed to connect students who need academic support with peer tutors on campus.
        </p>
        <p>
          Our mission is to make learning more accessible, convenient, and rewarding by allowing students to book tutoring sessions with knowledgeable peers while giving tutors the opportunity to earn and enhance their teaching skills.
        </p>
        <p>
          We believe in collaboration, growth, and accessibility—ensuring that education is a shared journey where everyone benefits. With flexible scheduling and on-campus convenience, Wild Teach empowers students to learn, teach, and succeed together.
        </p>
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
  );
}

export default AboutSection;
