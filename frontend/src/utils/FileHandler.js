import api from "./AxiosInstance.js";


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
    const response = await api.post(`/upload`, formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
  });
  return response.data; 

  } catch (error) {
    console.error('Error submitting the PDF: ',error);
    throw new Error(error.response.data.message)
  }
}

