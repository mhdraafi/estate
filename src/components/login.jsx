import React from 'react';
import { Link } from 'react-router-dom';
import './login.css';

export default function Login() {
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

          <form className="modern-form">
            <div className="input-group">
              <label>Email Address</label>
              <input type="email" placeholder="name@company.com" required />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input type="password" placeholder="••••••••" required />
            </div>

            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" /> Remember for 30 days
              </label>
              <a href="#" className="forgot-link">Forgot password?</a>
            </div>

            <button type="submit" className="login-submit-btn">Sign In</button>
            
            <p className="signup-prompt">
              Don't have an account? <Link to="/reg">Sign up for free</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}