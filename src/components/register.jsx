import React from 'react';
import { Container, Form } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './register.css';

export default function SignUp() {
  function handleRegister(e) {
    e.preventDefault();
    console.log("Account Created");
  }

  return (
    <div className="register-page">
      {/* Floating Back Button */}
      <Link to="/" className="back-to-site-floating">
        <i className="bi bi-arrow-left"></i>
        <span>Back to Site</span>
      </Link>

      <div className="register-card">
        {/* Left Side: Animated Image Section */}
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="register-image-section"
        >
          <div className="register-overlay">
            <h2>Join Our Community</h2>
            <p>Discover exclusive property deals and manage your listings effortlessly.</p>
          </div>
        </motion.div>

        {/* Right Side: Form Section */}
        <motion.div 
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="register-form-section"
        >
          <div className="form-header">
            <h1 className="estate-logo">RealEstate<span>.</span></h1>
            <p className="welcome-text">Start your journey with us today.</p>
          </div>

          <Form onSubmit={handleRegister} className="mt-4">
            <motion.div whileTap={{ scale: 0.98 }} className="input-group-modern">
              <label>Full Name</label>
              <input type="text" placeholder="John Doe" required />
            </motion.div>

            <motion.div whileTap={{ scale: 0.98 }} className="input-group-modern">
              <label>Email Address</label>
              <input type="email" placeholder="name@email.com" required />
            </motion.div>

            <motion.div whileTap={{ scale: 0.98 }} className="input-group-modern">
              <label>Phone Number</label>
              <input type="tel" placeholder="+91 98765 43210" required />
            </motion.div>

            <motion.div whileTap={{ scale: 0.98 }} className="input-group-modern">
              <label>Password</label>
              <input type="password" placeholder="••••••••" required />
            </motion.div>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              type="submit" 
              className="register-btn-modern"
            >
              Create Account
            </motion.button>

            <div className="form-footer-modern">
              <span>Already have an account? <Link to="/login">Login</Link></span>
            </div>
          </Form>
        </motion.div>
      </div>
    </div>
  );
}