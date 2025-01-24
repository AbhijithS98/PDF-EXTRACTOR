import React, { useState, useRef } from 'react';
import { Document, Page } from 'react-pdf';
import { toast } from 'react-toastify';
import "../index.css";

const PDFViewer = ({pdfFile, onExtract}) => {
  const [numPages, setNumPages] = useState(null); 
  const [pageNumber, setPageNumber] = useState(1); 
  const [selectedPages, setSelectedPages] = useState([]); 
  const [newPdfName, setNewPdfName] = useState(''); 
  const [isOverview, setIsOverview] = useState(false);
  const inputRef = useRef();
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

  const handleDone = () => {
    if (selectedPages.length === 0) {
      toast.error("Please select at least one page.");
      return;
    }
    console.log("Switching to overview:", selectedPages);
    setIsOverview(true);
    
  };


  const movePage = (index, direction) => {
    setSelectedPages((prevSelectedPages) => {
      const newOrder = [...prevSelectedPages];
      const [movedPage] = newOrder.splice(index, 1);
      const newIndex = index + direction;
      newOrder.splice(newIndex, 0, movedPage);
      return newOrder;
    });
  };


  const handleExtract = () => {  
    if (!newPdfName.trim()) {
      toast.error("Please enter a name for the new PDF.")
      inputRef.current.focus();
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
          

          {!isOverview ? (
            <>
                <div>
                  <p>Select pages to extract:</p> 
                  <br/>
                  <p>Page {pageNumber} of {numPages}</p>
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
                <button onClick={handleDone} className="extract-button">
                Done
                </button>     
               
            </>
          ) : (
            <>
              <div>
                <span className='text-danger'>*</span>
                <label>Enter new PDF name:</label> 
                <input 
                  ref={inputRef}
                  type="text"
                  value={newPdfName}
                  onChange={(e) => setNewPdfName(e.target.value)}
                  placeholder=""
                />
              </div>
              <p>Overview of selected pages (Rearrange if needed):</p>
              <div className="overview-container">
                <Document file={pdfFile}>
                {selectedPages.map((page, index) => (
                  <div key={page} className="overview-item">
                    <div>
                      <p>Page {page}</p>
                      <Page
                        pageNumber={page}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                        scale={scale}
                      />
                    </div>
                    <div className="reorder-buttons">
                      {index > 0 && (
                        <button
                          onClick={() => movePage(index, -1)}
                          className="reorder-button"
                        >
                          ↑
                        </button>
                      )}
                      {index < selectedPages.length - 1 && (
                        <button
                          onClick={() => movePage(index, 1)}
                          className="reorder-button"
                        >
                          ↓
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </Document>
              </div>

              <button onClick={handleExtract} className="extract-button">
                Extract
              </button>
            </>
          )}
             
        </div>
      )}
      
    </div>
  );
};

export default PDFViewer;