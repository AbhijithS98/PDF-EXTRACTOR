import React, {useState} from "react";
import { validatePdf, submitPdf } from "../utils/FileHandler";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


const FormPdf = ({listPDFs}) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const { isValid, error } = validatePdf(selectedFile);

    if(isValid) {
      setFile(selectedFile);
      
      
      setError('');
    } else {
      setFile(null);
      setError(error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!file) {
      setError('Please select a file before submitting !')
      return;
    }
    
    try {
      const result = await submitPdf(file);
      console.log('File uploaded successfully:', result);
      toast.success(result.message || "succesfully uploaded")
      setFile(null);
      listPDFs();
      e.target.reset();
    } catch (uploadError) {
      toast.info('Please login, to upload a file!')
      navigate('/login')
    }
  }

  return (
    <div className="row justify-content-center">
      <form className="col-md-6 col-lg-4 mt-5" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="pdf" className="form-label">
            Upload PDF:
          </label>
          <input
            type="file"
            id="pdf"
            className="form-control"
            onChange={handleFileChange}
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" className="btn btn-primary w-100">Submit</button>
      </form> 
    </div>
  )
}


export default FormPdf