import axios from 'axios';
import store from '../redux/store.js'
import { clearCredentials } from '../redux/slices/userAuthSlice.js';
const backendURL = import.meta.env.VITE_BACKEND_URL;
import { toast } from "react-toastify";
console.log('Backend URL:', backendURL);

const api = axios.create({
  baseURL: `${backendURL}/api`,
  withCredentials: true,  
  headers: {
    'Content-Type': 'application/json', 
  },      
});

console.log('Axios baseURL:', api.defaults.baseURL);

//response interceptor for handling token expiration
api.interceptors.response.use(
  (response) => response, 
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      error.response?.data?.code === 'TOKEN_EXPIRED' &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true; 

      try {
        // Trigger the refresh token API
        console.log("triggering refresh ");
        
        await axios.post(
          `${backendURL}/api/refresh-token`, 
          {},
          { withCredentials: true } 
        );

        // Cookies are set automatically, retry request
        return api(originalRequest);

      } catch (refreshError) {
        // If refresh token fails, log out the user
        store.dispatch(clearCredentials());
        return Promise.reject(refreshError);
      }
    }
    else if(error.response?.status === 400){
      console.error('Error intercepted:', error);
      const errorMessage = error.response?.data?.message || 'Something went wrong';
      toast.error(errorMessage);
    }
    return Promise.reject(error);
  }
);

export default api;
