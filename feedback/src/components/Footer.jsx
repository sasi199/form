import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <div className="footer">
      <div className="contact-info">
        <p>For inquiries:</p>
        <p>Email: feedback@whytap.in</p>
        <p>Phone: +91 8098799991</p>
      </div>
      <div className="website-link">
        <p>Visit our website: <a href="https://www.whytap.in">www.whytap.in</a></p>
      </div>
    </div>
  );
}

export default Footer;