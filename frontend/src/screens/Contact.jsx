import React from "react";

const Contact = () => {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Contact Us</h1>
      <div className="card shadow-sm p-4">
        <p>
          Have questions, feedback, or need assistance? We're here to help! Feel free to reach out to us through the following channels:
        </p>
        <h5 className="mt-3">Contact Details:</h5>
        <ul className="list-unstyled">
          <li>
            <strong>Email:</strong> <a href="mailto:support@p4pdf.com">support@p4pdf.com</a>
          </li>
          <li>
            <strong>Phone:</strong> +1-234-567-890
          </li>
          <li>
            <strong>Address:</strong> 123 PDF Lane, File City, Docsland, 45678
          </li>
        </ul>
        <h5 className="mt-4">Follow Us:</h5>
        <div className="d-flex gap-3 mt-2">
          <a
            href="https://www.facebook.com/p4pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Facebook
          </a>
          <a
            href="https://www.twitter.com/p4pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-info"
          >
            Twitter
          </a>
          <a
            href="https://www.instagram.com/p4pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-danger"
          >
            Instagram
          </a>
        </div>
        <p className="mt-4">
          We're committed to providing the best experience with <strong>P4PDF</strong>. Feel free to drop us a message for any inquiries or suggestions.
        </p>
      </div>
    </div>
  );
};

export default Contact;
