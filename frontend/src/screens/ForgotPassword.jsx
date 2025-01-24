import React, { useState } from "react";
import { toast } from "react-toastify";
import api from "../utils/AxiosInstance.js";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }

    try {
      setLoading(true);
      const response = await api.post("/forgot-password", { email });
      toast.success(response.data.message || "Password reset link sent!");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to send reset link. Try again."
      );
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="container mt-5 p-5">
      <div className="row justify-content-center">
        <div className="col-md-12 col-lg-6">
          <div className="card shadow p-4">
            <h3 className="text-center mb-4">Forgot Password</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
            </form>
            <div className="text-center mt-3">
              <a href="/login" className="text-decoration-none">
                Back to Login
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
