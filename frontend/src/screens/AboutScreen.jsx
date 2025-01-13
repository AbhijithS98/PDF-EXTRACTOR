import React from "react";

const About = () => {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">About P4PDF</h1>
      <div className="card shadow-sm p-4">
        <p>
          <strong>P4PDF</strong> is a simple and efficient tool designed to make working with PDF files easier and more accessible. Our application allows users to upload PDF files, select specific pages they want to extract, and create a new PDF containing only the selected content. 
        </p>
        <p>
          Whether you're organizing documents, sharing specific pages, or extracting important content, <strong>P4PDF</strong> offers a streamlined solution for your needs. With a user-friendly interface, powerful features, and quick processing, managing PDFs has never been simpler!
        </p>
        <h5 className="mt-3">Key Features:</h5>
        <ul>
          <li>Upload and preview PDF files.</li>
          <li>Select and extract specific pages.</li>
          <li>Download the extracted content as a new PDF.</li>
          <li>Responsive design for a seamless experience across devices.</li>
        </ul>
        <p className="mt-3">
          <strong>P4PDF</strong> is the perfect tool for students, professionals, and anyone who frequently works with PDF documents. Start simplifying your PDF tasks today!
        </p>
      </div>
    </div>
  );
};

export default About;
