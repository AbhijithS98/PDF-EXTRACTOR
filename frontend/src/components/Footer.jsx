import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-5 shadow-lg">
      <div className="container text-center">
        <p className="fw-bold fs-5 mb-3">
          &copy; {new Date().getFullYear()} <span className="text-warning">P4PDF</span>. All Rights Reserved.
        </p>
        <p className="mb-3">
          Made with <span className="text-danger">❤️</span> by the <strong>P4PDF Team</strong>
        </p>
        <div className="d-flex justify-content-center gap-3 mb-3">
          <a
            href="/about"
            className="text-white text-decoration-none border-bottom border-warning pb-1 hover-underline"
          >
            About
          </a>
          <a
            href="/contact"
            className="text-white text-decoration-none border-bottom border-warning pb-1 hover-underline"
          >
            Contact
          </a>
          <a
            href="https://github.com/AbhijithS98/PDF-EXTRACTOR.git"
            className="text-white text-decoration-none border-bottom border-warning pb-1 hover-underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
        <p className="small mb-0">"Enhancing your document experience, one PDF at a time."</p>
      </div>
    </footer>
  );
};

export default Footer;
