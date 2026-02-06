import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/first";
import "./login.css";

export default function Login() {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("login/", credentials);

      const user = response.data.user;
      alert(`Login Successful! Welcome ${user.fname}`);

     
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userData", JSON.stringify(user));

      navigate("/"); 
    } catch (err) {
      console.error("Login Error:", err.response?.data || err.message);
      alert(err.response?.data?.error || "Invalid Email or Password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-image-section">
          <div className="overlay">
            <h2>Find Your Next Home</h2>
            <p>Access premium listings and personalized property alerts.</p>
          </div>
        </div>

        <div className="login-form-section">
          <div className="login-header">
            <Link to="/" className="back-home">← Back to Site</Link>
            <h1 className="estate-logo">RealEstate<span>.</span></h1>
            <p className="welcome-text">Welcome back! Please enter your details.</p>
          </div>

          <form className="modern-form" onSubmit={handleLogin}>
            <div className="input-group">
              <label>Email Address</label>
              <input
                name="email"
                type="email"
                placeholder="name@company.com"
                value={credentials.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                name="password"
                type="password"
                placeholder="••••••••"
                value={credentials.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" /> Remember for 30 days
              </label>
              <a href="#" className="forgot-link">Forgot password?</a>
            </div>

            <button type="submit" className="login-submit-btn">
              Sign In
            </button>

            <p className="signup-prompt">
              Don't have an account? <Link to="/reg">Sign up for free</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
