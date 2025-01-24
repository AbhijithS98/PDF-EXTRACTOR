import React, { useState } from 'react';
import api from '../utils/AxiosInstance.js';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setCredentials } from '../redux/slices/userAuthSlice.js';
import { toast } from 'react-toastify';



const Login = () => {
  const [Email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      const response = await api.post(`/login`, { Email,password });
      const { userId, name, email, token } = response?.data;
      dispatch(setCredentials({
        userId,
        name,
        email,
        token
      }))
      toast.success("Logged in successfully!")
      navigate("/")

    } catch (error) {
      console.error('Error during login:', error);
    }

  };

  return (
    <div className="container mt-5 pt-5 vh-100">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h3 className="text-center mb-4">Login to your account</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter your email"
                    value={Email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-dark">
                    Login
                  </button>
                </div>

                
            
                  <div className='d-flex justify-content-between mt-4'>
                  <a href="/forgot-password" className='text-danger'>Forgot your password ?</a>
                  <p className='text-muted'>Don't have an account?  <a href="/signup" className='text-danger'>Sign up</a></p>                             
                  </div>
                
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
