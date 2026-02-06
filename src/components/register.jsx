import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/first";  
import "./register.css";

export default function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fname: "",
    email: "",
    mobile: "",
    password: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
    setSuccess("");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("register/", formData);

      setSuccess("Registration successful!");
      setError("");
      setFormData({ fname: "", email: "", mobile: "", password: "" });

      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      console.error("Registration Error:", err.response?.data || err.message);

      if (err.response?.data) {
        const messages = Object.values(err.response.data).flat().join(" ");
        setError(messages);
      } else {
        setError("Registration failed. Please try again.");
      }
      setSuccess("");
    }
  };

  return (
    <div className="register-page">
      <Link to="/" className="back-to-site-floating">
        <i className="bi bi-arrow-left"></i>
        <span>Back to Site</span>
      </Link>

      <div className="register-card">
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

          {success && <p className="text-success mb-3">{success}</p>}
          {error && <p className="text-danger mb-3">{error}</p>}

          <Form onSubmit={handleRegister} className="mt-4">
            <motion.div whileTap={{ scale: 0.98 }} className="input-group-modern">
              <label>Full Name</label>
              <input
                name="fname"
                type="text"
                placeholder="John Doe"
                value={formData.fname}
                onChange={handleChange}
                required
              />
            </motion.div>

            <motion.div whileTap={{ scale: 0.98 }} className="input-group-modern">
              <label>Email Address</label>
              <input
                name="email"
                type="email"
                placeholder="name@email.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </motion.div>

            <motion.div whileTap={{ scale: 0.98 }} className="input-group-modern">
              <label>Phone Number</label>
              <input
                name="mobile"
                type="text"
                placeholder="9876543210"
                value={formData.mobile}
                onChange={handleChange}
                required
              />
            </motion.div>

            <motion.div whileTap={{ scale: 0.98 }} className="input-group-modern">
              <label>Password</label>
              <input
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="register-btn-modern"
            >
              Create Account
            </motion.button>

            <div className="form-footer-modern mt-3">
              <span>
                Already have an account? <Link to="/login">Login</Link>
              </span>
            </div>
          </Form>
        </motion.div>
      </div>
    </div>
  );
}
