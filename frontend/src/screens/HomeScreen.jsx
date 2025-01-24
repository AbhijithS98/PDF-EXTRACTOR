  import React, { useEffect, useState } from "react";
  import FormPdf from "../components/FormPdf";
  import PDFViewer from "../components/PdfComp";
  import { useSelector } from "react-redux";
  import api from "../utils/AxiosInstance.js";
  import { toast } from "react-toastify";
  import Swal from 'sweetalert2';
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  import './home.css';

  const HomeScreen = () => {

    const { userInfo } = useSelector((state) => state.userAuth);
    const [fileId, setFileId] = useState("");
    const [fileUrl,setFileUrl] = useState("");
    const [uploaded,setUploaded] = useState("");
    const [extracted,setExtracted] = useState("");

    const [uploadedPage, setUploadedPage] = useState(1);
    const [extractedPage, setExtractedPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(()=>{
      if(userInfo){
        console.log("userInfo: ",userInfo);      
      }
    },[userInfo]);

    useEffect(()=>{
      getPdfs();
    },[]);

    const getPdfs = async () => {
      const response = await api.get('/allFiles');
      console.log("resss is:",response.data);
      console.log("res is:",response.data.files);
      setUploaded(response.data.files.uploaded);
      setExtracted(response.data.files.extracted);
    }

    const SetFileDetails = (id,path) => {
      console.log("id: ",id);
      console.log("path: ",path);
      setFileId(id);
      setFileUrl(`${backendURL}/${path}`);
    }

    const handleExtractPages = async (selectedPages,newPdfName) => {
      try {
        const response = await api.post("/extract", {
          fileId, 
          selectedPages,
          newPdfName
        });
        console.log("extraction response: ",response);
        const downloadUrl = response.data.downloadUrl;

// Show SweetAlert with the download link
        Swal.fire({
          title: "Extraction Successful!",
          html: `
            <p>Extraction completed! Click below to download your file:</p>
            <a
              href="${downloadUrl}"
              download
              class="btn btn-success"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download Extracted PDF
            </a>
          `,
          icon: "success",
          showCloseButton: true,
          showConfirmButton: false, 
        });
       
        setFileId('');
        setFileUrl('');
        getPdfs();
      } catch (error) {
        console.error("Error during page extraction:", error);
        toast.error("Failed to extract pages. Please try again.");
      }
    };


// Pagination Logic
    const paginate = (array, page) => {
      const startIndex = (page - 1) * itemsPerPage;
      return array.slice(startIndex, startIndex + itemsPerPage);
    };

    const totalPages = (array) => Math.ceil(array.length / itemsPerPage);

    return (
        
      <div className="main-container">
      <div className="content">
      <div className="text-center mt-5 p-5">
        <h2>{`Welcome to PDF extractor ${userInfo? userInfo.name : ''}`}</h2>
        <p>Please upload the PDF file to extract down below !</p> 
      </div>
      <FormPdf listPDFs={getPdfs}/>

      {userInfo && (
       <>
          <div className="pdf-list-container">
            <h3 className="mt-5 text-center">Extracted Files</h3>
            {extracted.length > 0 ? (
              <div className="d-flex flex-wrap justify-content-center gap-3 mt-3">
                {paginate(extracted,extractedPage).map((file, index) => (
                  <div
                    key={index}
                    className="card p-3 shadow-sm"
                    style={{ width: "18rem" }}
                  >
                    <div className="card-body text-center">
                      <h5 className="card-title text-truncate">{file.fileName}</h5>
                      
                      <a
                        href={`${backendURL}/${file.filePath}`}
                        download
                        class="btn btn-success mt-3"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                       View & <i className="bi bi-download"></i> 
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center mt-3">No extracted files available yet.</p>
            )}

{/* Pagination Controls */}
            {extracted.length > itemsPerPage && (
              <div className="pagination-controls text-center mt-3">
                <button
                  className="btn btn-primary"
                  disabled={extractedPage === 1}
                  onClick={() => setExtractedPage((prev) => prev - 1)}
                >
                  Previous
                </button>
                <span className="mx-3">{`Page ${extractedPage} of ${totalPages(extracted)}`}</span>
                <button
                  className="btn btn-primary"
                  disabled={extractedPage === totalPages(extracted)}
                  onClick={() => setExtractedPage((prev) => prev + 1)}
                >
                  Next
                </button>
              </div>
            )}
          </div>

{/* Uploaded Files */}
          <div className="pdf-list-container">
            <h3 className="mt-5 text-center">Uploaded Files</h3>
            {uploaded.length > 0 ? (
              <ul className="list-group mt-3">
                {paginate(uploaded,uploadedPage).map((file, index) => (
                  <li
                    key={index}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <span>{file.fileName}</span>
                    <button
                      className="btn btn-primary"
                      onClick={() => SetFileDetails(file._id, file.filePath)}
                    >
                      Show PDF
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center">No files uploaded yet.</p>
            )}

{/* Pagination Controls */}
            {uploaded.length > itemsPerPage && (
              <div className="pagination-controls text-center mt-3">
                <button
                  className="btn btn-primary"
                  disabled={uploadedPage === 1}
                  onClick={() => setUploadedPage((prev) => prev - 1)}
                >
                  Previous
                </button>
                <span className="mx-3">{`Page ${uploadedPage} of ${totalPages(uploaded)}`}</span>
                <button
                  className="btn btn-primary"
                  disabled={uploadedPage === totalPages(uploaded)}
                  onClick={() => setUploadedPage((prev) => prev + 1)}
                >
                  Next
                </button>
              </div>
            )}
          </div>
          
       </>
       )}   
      <PDFViewer pdfFile={fileUrl} onExtract={handleExtractPages}/>
      </div>
      </div>
     
    )
  }


export default HomeScreen;