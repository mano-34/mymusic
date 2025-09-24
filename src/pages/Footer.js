import React from "react";
import { FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} BeatBox | All Rights Reserved.</p>
      <div className="social-icons">
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <FaInstagram />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <FaTwitter />
        </a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebook />
        </a>
      </div>
    </footer>
  );
}

export default Footer;