import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-secondary text-white text-center py-3 mt-5">
      <div className="container">
        <p className="mb-2">
          &copy; {new Date().getFullYear()} <strong>P4PDF</strong>. All Rights Reserved.
        </p>
        <p className="mb-0">
          Made with ❤️ by the P4PDF Team
        </p>
        <div className="mt-2">
          <a
            href="/about"
            className="text-white me-3 text-decoration-none"
          >
            About
          </a>
          <a
            href="/contact"
            className="text-white me-3 text-decoration-none"
          >
            Contact
          </a>
          <a
            href="https://github.com/AbhijithS98/PDF-EXTRACTOR.git" 
            className="text-white text-decoration-none"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
