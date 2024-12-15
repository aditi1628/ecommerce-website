import React from "react";
import { Link } from "react-router-dom";
import "../styles/Footer.css";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-links">
        <Link to="/" className="footer-link">
          Home
        </Link>
        <Link to="/about-us" className="footer-link">
          About Us
        </Link>
        <Link to="/contact-us" className="footer-link">
          Contact Us
        </Link>
        <p>&copy; 2024 Made By Aditi Bhargava. All Rights Reserved.</p>
      </div>
    </footer>
  );
};
export default Footer;
