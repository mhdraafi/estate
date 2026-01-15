import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './contact.css';

export default function Contact() {
  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  return (
    <div className="contact-page">
      {/* Fixed Navigation Bar */}
      <nav className="navbar-custom">
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

      <Container className="py-5">
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }} 
          variants={fadeInUp}
          className="text-center mb-5"
        >
          <h1 className="display-4 fw-bold gradient-text">Get In Touch</h1>
          <p className="text-muted">Have questions? We're here to help you find your way home.</p>
        </motion.div>

        <motion.div 
          className="contact-card-main"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Row className="g-0">
            {/* Info Side */}
            <Col lg={5} className="contact-info-side">
              <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <h3 className="mb-4 fw-bold">Contact Information</h3>
                
                <motion.div className="info-item" variants={fadeInUp}>
                  <div className="icon-circle"><i className="bi bi-telephone-fill"></i></div>
                  <div>
                    <p className="mb-0 small opacity-75">Call Us</p>
                    <h5 className="mb-0">+91 98765 43210</h5>
                  </div>
                </motion.div>

                <motion.div className="info-item" variants={fadeInUp}>
                  <div className="icon-circle"><i className="bi bi-envelope-paper-fill"></i></div>
                  <div>
                    <p className="mb-0 small opacity-75">Email Us</p>
                    <h5 className="mb-0">hello@realestate.com</h5>
                  </div>
                </motion.div>

                <motion.div className="info-item" variants={fadeInUp}>
                  <div className="icon-circle"><i className="bi bi-geo-alt-fill"></i></div>
                  <div>
                    <p className="mb-0 small opacity-75">Visit Us</p>
                    <h5 className="mb-0">MG Road, Kochi, Kerala</h5>
                  </div>
                </motion.div>
              </motion.div>
            </Col>

            {/* Form Side */}
            <Col lg={7} className="contact-form-side">
              <Form>
                <Row>
                  <Col md={6} className="mb-4">
                    <Form.Group>
                      <Form.Label className="label-custom">Your Name</Form.Label>
                      <Form.Control type="text" className="form-control-modern" placeholder="John Doe" />
                    </Form.Group>
                  </Col>
                  <Col md={6} className="mb-4">
                    <Form.Group>
                      <Form.Label className="label-custom">Email Address</Form.Label>
                      <Form.Control type="email" className="form-control-modern" placeholder="john@example.com" />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-4">
                  <Form.Label className="label-custom">Message</Form.Label>
                  <Form.Control as="textarea" rows={4} className="form-control-modern" placeholder="How can we help?" />
                </Form.Group>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button className="modern-send-btn w-100">SEND MESSAGE</Button>
                </motion.div>
              </Form>
            </Col>
          </Row>
        </motion.div>

        {/* Google Maps Section */}
        <motion.div 
          className="map-container-wrapper mt-5"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62860.63914868725!2d76.271083!3d9.931233!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080d514abdc6bf%3A0x9ed301538354c414!2sKochi%2C%20Kerala!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
            width="100%" 
            height="450" 
            style={{ border: 0, borderRadius: "25px" }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Map Kochi"
          ></iframe>
        </motion.div>
      </Container>
      <footer className="modern-footer">
  <div className="footer-glow"></div>
  <div className="container">
    <div className="row gy-5">
      <div className="col-lg-4 col-md-12">
        <h2 className="footer-logo">RealEstate<span>.</span></h2>
        <p className="footer-text">Elevating your living experience with premium properties across Kerala. Find your sanctuary with us.</p>
        <div className="social-tray">
          {['facebook', 'instagram', 'twitter', 'linkedin'].map(icon => (
            <div key={icon} className="social-item">
              <i className={`bi bi-${icon}`}></i>
            </div>
          ))}
        </div>
      </div>

      <div className="col-lg-2 col-md-4 footer-links">
        <h5>Explore</h5>
        <ul className="list-unstyled">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/properties">Properties</Link></li>
          <li><Link to="/About">About Us</Link></li>
        </ul>
      </div>
      <div className="col-lg-3 col-md-4 footer-links">
        <h5>Services</h5>
        <ul className="list-unstyled">
          <li><Link to="#">Consultation</Link></li>
          <li><Link to="#">Home Loans</Link></li>
          <li><Link to="#">Interior Design</Link></li>
        </ul>
      </div>
      <div className="col-lg-3 col-md-4">
        <h5>Newsletter</h5>
        <p className="small text-secondary">Get the latest property deals sent to your inbox.</p>
        <div className="newsletter-input">
          <input type="email" placeholder="Enter email" />
          <button><i className="bi bi-arrow-right"></i></button>
        </div>
      </div>
    </div> 
    <div className="footer-bottom">
      <p>&copy; 2026 RealEstate Kerala. All Rights Reserved.</p>
    </div>
  </div>
</footer>
    </div>
  );
}