import React from 'react';
import api from '../utils/AxiosInstance.js';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCredentials } from '../redux/slices/userAuthSlice.js';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId, name, email, isAuthenticated } = useSelector((state) => state.userAuth);

  const handleLogout = async(e)=>{
    try{
       const res = await api.post('/logout')
       dispatch(clearCredentials());
       toast.success("Logged Out Successfully")
       navigate("/login")
 
    } catch(err){
       toast.error(err.message || "Logout failed. Please try again.")
    }
   }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary" style={{ margin: "0 -10px" }}>
      <div className="container">
        <a className="navbar-brand" href="/">
          <strong>P4PDF</strong>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a className="nav-link active" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/about">
                About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/contact">
                Contact
              </a>
            </li>
          </ul>
          <ul className="navbar-nav">
            {isAuthenticated ? (
              <li className="nav-item">
                <button
                  className="btn btn-outline-danger"
                  onClick={handleLogout}
                >
                  <span className="text-white">Logout</span>
                </button>
              </li>
              )               
               : 
              (
              <>
               <li className="nav-item">
                 <a className="btn btn-outline-light me-2" href="/login">
                   Login
                 </a>
               </li>
               <li className="nav-item">
                 <a className="btn btn-outline-light me-2" href="/signup">
                   Signup
                 </a>
               </li>
              </> 
              )    
            }        
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
