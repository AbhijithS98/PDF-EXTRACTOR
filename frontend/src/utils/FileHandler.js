import axios from 'axios';
const backendURL = import.meta.env.VITE_BACKEND_URL;

export const validatePdf = (file) => {
  if(file && file.type === 'application/pdf') {
    return {isValid : true, error : ''}
  }
  return { isValid : false, error : 'Please upload a valid PDF file !'}
};


export const submitPdf = async (file) => {
  const formData = new FormData();
  formData.append('pdf', file);
  
  try {
    console.log("formdata is: ",formData)
    const response = await axios.post(`${backendURL}/api/upload`, formData, {
      headers: {
          'Content-Type': 'multipart/form-data',
      },
  });
  return response.data; 

  } catch (error) {
    console.error('Error submitting the PDF: ',error);
    throw new Error('Failed to submit the PDF file !')
  }
}

