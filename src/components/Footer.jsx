import React from 'react';
import '../styles/Footer.css'; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-email">Example@email.com</p>
        <p className="footer-copyright">
          Copyright © {new Date().getFullYear()} Name. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;