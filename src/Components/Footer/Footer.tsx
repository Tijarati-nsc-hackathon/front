import React from "react";
import "./footer.css";
import logo from '../assets/logos/logo2.1g.png'

const Footer = () => (
  <footer className="footer">
    {/* 1280-px wide centred container */}
    <div className="footer-inner">
      {/* Logo Section */}
      <div className="footer-logo">
        <img src={logo} alt="Logo" className="footer-logo-image" />
      </div>

      <div className="footer-column">
        <h4>Support</h4>
        <ul>
          <li>Help centre</li>
          <li>Account information</li>
          <li>About</li>
          <li>Contact us</li>
        </ul>
      </div>

      <div className="footer-column">
        <h4>Help and Solution</h4>
        <ul>
          <li>Talk to support</li>
          <li>Support docs</li>
          <li>System status</li>
          <li>Covid responde</li>
        </ul>
      </div>

      <div className="footer-column">
        <h4>Product</h4>
        <ul>
          <li>Update</li>
          <li>Security</li>
          <li>Beta test</li>
          <li>Pricing product</li>
        </ul>
      </div>
    </div>
  </footer>
);

export default Footer;