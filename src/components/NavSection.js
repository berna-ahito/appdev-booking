import React from "react";
import { Link } from "react-router-dom";
import "./NavSection.css";

function NavSection() {
  return (
    <div className="nav-section">
      <h1>WILD TEACH</h1>
      <button><Link to="/">Home</Link></button>
      <button><Link to="/about">What is Wild Teach?</Link></button>
      <button><Link to="/how-it-works">How It Works?</Link></button>
      <button><Link to="/about-us">About Us</Link></button>
      <button><Link to="/contact">Contact Us</Link></button>
    </div>
  );
}

export default NavSection;
