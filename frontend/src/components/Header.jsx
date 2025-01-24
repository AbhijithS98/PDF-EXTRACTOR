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
  const { userInfo } = useSelector((state) => state.userAuth);

  const handleLogout = async (e) => {
    try {
      const res = await api.post('/logout');
      dispatch(clearCredentials());
      toast.success("Logged Out Successfully");
      navigate("/login");
    } catch (err) {
      toast.error(err.message || "Logout failed. Please try again.");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ background: 'linear-gradient(90deg, rgb(4, 92, 89) 0%, rgb(111, 159, 210) 100%)', margin: "0 -10px" }}>
      <div className="container">
        <a className="navbar-brand fw-bold text-white" href="/">
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
              <a className="nav-link text-white fw-bold" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white fw-bold" href="/about">
                About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white fw-bold" href="/contact">
                Contact
              </a>
            </li>
          </ul>
          <ul className="navbar-nav">
            {userInfo ? (
              <li className="nav-item">
                <button
                  className="btn btn-outline-light fw-bold"
                  onClick={handleLogout}
                  style={{ borderRadius: '50px', transition: 'background 0.3s ease' }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#dc3545'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = ''}
                >
                  <span>Logout</span>
                </button>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <a className="btn btn-outline-light me-2 fw-bold" href="/login" style={{ borderRadius: '50px', transition: 'background 0.3s ease' }}>
                    Login
                  </a>
                </li>
                <li className="nav-item">
                  <a className="btn btn-outline-light me-2 fw-bold" href="/signup" style={{ borderRadius: '50px', transition: 'background 0.3s ease' }}>
                    Signup
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
