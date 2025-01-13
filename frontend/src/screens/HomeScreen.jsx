  import React, { useEffect, useState } from "react";
  import FormPdf from "../components/FormPdf";
  import PDFViewer from "../components/PdfComp";
  import { useSelector } from "react-redux";
  import api from "../utils/AxiosInstance.js";
  const backendURL = import.meta.env.VITE_BACKEND_URL;


  const HomeScreen = () => {

    const { userInfo } = useSelector((state) => state.userAuth);
    const [fileId, setFileId] = useState("");
    const [fileUrl,setFileUrl] = useState("");
    const [allFiles,setAllFiles] = useState("");


    useEffect(()=>{
      if(userInfo){
        console.log("userInfo: ",userInfo);      
      }
    },[userInfo]);

    useEffect(()=>{
      getPdfs();
    },[]);

    const getPdfs = async () => {
      const response = await api.get('/uploadedPdfs');
      console.log("res is:",response.data.files);
      setAllFiles(response.data.files);
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
  
        // Handle success response
        const extractedFileUrl = response.data.extractedFileUrl; // Backend should return the new file URL
        console.log("Extracted file URL:", extractedFileUrl);
        alert("Pages extracted successfully!");
      } catch (error) {
        console.error("Error during page extraction:", error);
        alert("Failed to extract pages. Please try again.");
      }
    };

    return (
      <>
      <div className="text-center mt-5">
        <h2>{`Welcome to PDF extractor ${userInfo? userInfo.name : ''}`}</h2>
        <p>Please upload the PDF file to extract down below !</p> 
      </div>
      <FormPdf />
      <div className="pdf-list-container">
          <h3 className="mt-5 text-center">Uploaded Files</h3>
          {allFiles.length > 0 ? (
            <ul className="list-group mt-3">
              {allFiles.map((file, index) => (
                <li
                  key={index}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <span>{file.fileName}</span>
                  <button
                    className="btn btn-primary"
                    onClick={() => SetFileDetails(file._id,file.filePath)}
                  >
                    Show PDF
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No files uploaded yet.</p>
          )}
        </div>
      <PDFViewer pdfFile={fileUrl} onExtract={handleExtractPages}/>
      </>
    )
  }


  export default HomeScreen;
