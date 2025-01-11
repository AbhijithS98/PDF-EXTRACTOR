import axios from 'axios';
const backendURL = import.meta.env.VITE_BACKEND_URL;

const api = axios.create({
  baseURL: `${backendURL}/api`, 
  headers: {
    'Content-Type': 'application/json', // Default content type
  },
  withCredentials: true,       
});

export default api;
