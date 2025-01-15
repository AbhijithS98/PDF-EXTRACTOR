  import React, { useEffect, useState } from "react";
  import FormPdf from "../components/FormPdf";
  import PDFViewer from "../components/PdfComp";
  import { useSelector } from "react-redux";
  import api from "../utils/AxiosInstance.js";
  import { toast } from "react-toastify";
  import Swal from 'sweetalert2';
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const HomeScreen = () => {

    const { userInfo } = useSelector((state) => state.userAuth);
    const [fileId, setFileId] = useState("");
    const [fileUrl,setFileUrl] = useState("");
    const [uploaded,setUploaded] = useState("");
    const [extracted,setExtracted] = useState("");

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

    return (
      <>   
      <div className="text-center mt-5">
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
                {extracted.map((file, index) => (
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
          </div>

          <div className="pdf-list-container">
            <h3 className="mt-5 text-center">Uploaded Files</h3>
            {uploaded.length > 0 ? (
              <ul className="list-group mt-3">
                {uploaded.map((file, index) => (
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
          </div>
       </>
       )}   
      <PDFViewer pdfFile={fileUrl} onExtract={handleExtractPages}/>
      </>
    )
  }


export default HomeScreen;