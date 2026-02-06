import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import API from '../api/first';

import "./index.css"; 
import "./navbar.css";
import './contact.css';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-visible");
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll(".reveal");
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');
    try {
      await API.post('contact/', { name, email, message });
      setSuccess('✨ Your inquiry has been sent!');
      setName(''); setEmail(''); setMessage('');
    } catch (err) {
      setError('❌ Failed to connect. Please try again.');
    }
  };

  return (
    <div className="contact-page-wrapper">
      <nav className="navbar">
        <div className="nav-logo">
          <h2>RealEstate</h2>
        </div>
        <ul className="nav-links">
          <Link to="/"><li>Home</li></Link>
          <Link to="/properties"><li>Properties</li></Link>
          <Link to="/About"><li>About</li></Link>
          <Link to="/Contact"><li>Contact</li></Link>
        </ul>
        <div className="nav-buttons">
          <Link to="/login"><button className="login-btn">Login</button></Link>
          <Link to="/reg"><button className="register-btn">Register</button></Link>
        </div>
      </nav>

      <div className="contact-hero">
        <div className="hero-content hero-animate">
          <h1 className="reveal gradient-title">Inquire Luxury</h1>
          <p className="reveal delay-1 text-white opacity-75">Bespoke assistance for premium property acquisitions</p>
        </div>
      </div>

      <Container className="pb-5 mb-5">
        <Row className="justify-content-center">
          <Col md={10} lg={6}>
            <div className="contact-form-card reveal delay-2">
              <h2 className="text-center mb-5 fw-bold text-white">Contact Our Experts</h2>
              
              {success && <p className="status-msg success-glow">{success}</p>}
              {error && <p className="status-msg error-glow">{error}</p>}

              <Form onSubmit={handleSubmit}>
                <div className="reveal delay-1">
                  <Form.Group className="mb-4">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      className="custom-input"
                      required
                      placeholder="e.g., Alexander King"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Form.Group>
                </div>

                <div className="reveal delay-2">
                  <Form.Group className="mb-4">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      className="custom-input"
                      type="email"
                      required
                      placeholder="name@exclusive.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>
                </div>

                <div className="reveal delay-3">
                  <Form.Group className="mb-4">
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                      className="custom-input"
                      as="textarea"
                      rows={4}
                      required
                      placeholder="Describe your requirements..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </Form.Group>
                </div>

                <div className="reveal delay-4">
                  <button type="submit" className="search-btn-glow w-100 py-3 mt-3">
                    Submit Inquiry
                  </button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>

      <footer className="modern-footer">
        <div className="footer-glow"></div>
        <div className="container">
          <div className="row gy-5">
            <div className="col-lg-4">
              <h2 className="footer-logo">RealEstate<span>.</span></h2>
              <p className="footer-text">Curating architectural masterpieces across the globe.</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 RealEstate Kerala. Private Collection.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}