import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import "../index.css";

const PDFViewer = ({pdfFile, onExtract}) => {
  const [numPages, setNumPages] = useState(null); 
  const [pageNumber, setPageNumber] = useState(1); 
  const [selectedPages, setSelectedPages] = useState([]); 
  const [newPdfName, setNewPdfName] = useState(''); 
  const scale = 1.5;

  // Function to handle when the document is loaded
  const onLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  // Toggle page selection
  const togglePageSelection = (pageNumber) => {
    setSelectedPages((prevSelectedPages) =>
      prevSelectedPages.includes(pageNumber)
        ? prevSelectedPages.filter((page) => page !== pageNumber) // Remove if already selected
        : [...prevSelectedPages, pageNumber] // Add if not selected
    );
  };

  const handleExtract = () => {
    if (selectedPages.length === 0) {
      alert("Please select at least one page to extract.");
      return;
    }
    if (!newPdfName.trim()) {
      alert("Please enter a name for the new PDF.");
      return;
    }
    console.log("Selected pages for extraction:", selectedPages);
    console.log("New PDF name:", newPdfName);
    if (onExtract) {
      onExtract(selectedPages,newPdfName);
    }
  };

  return (
    <div>
      {pdfFile && (
        <div className='pdf-div'>
          <p>Select pages to extract:</p> 
          <br/>
          <p>
            Page {pageNumber} of {numPages}
          </p>

          {/* Input for the new PDF name */}
          <div>
            <label>Enter new PDF name:</label>
            <input 
              type="text"
              value={newPdfName}
              onChange={(e) => setNewPdfName(e.target.value)}
              placeholder="Enter a name for the new PDF"
            />
          </div>

          <Document
            file={pdfFile}
            onLoadSuccess={onLoadSuccess}
          >
            {Array.from({ length: numPages }, (_, i) => i + 1).map((page) => (
              <div key={page} className="pdf-page-wrapper">
                <label>
                  <input
                    type="checkbox"
                    checked={selectedPages.includes(page)}
                    onChange={() => togglePageSelection(page)}
                  />
                  Page {page}
                </label>
                <Page
                  pageNumber={page}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  scale={scale}
                />
              </div>
            ))}         
          </Document>       
          <button onClick={handleExtract} className="extract-button">
            Extract Selected Pages
          </button>   
        </div>
      )}
      {!pdfFile && (
        <div className='text-center mt-5'>
          <p>No pdf file specified !</p>
        </div>
      )}
    </div>
  );
};

export default PDFViewer;