import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import "./navbar.css";
import './about.css';

export default function About() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div className="about-page">
      <nav className="navbar">
        <div className="nav-logo"><h2>RealEstate</h2></div>
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

      {/* Minimalist Hero */}
      <section className="about-hero-clean py-5">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={7}>
              <motion.span className="section-subtitle" {...fadeInUp}>Our Philosophy</motion.span>
              <motion.h2 className="section-title-small" {...fadeInUp}>
                Simplicity in finding, <br /> excellence in living.
              </motion.h2>
              <motion.p className="section-desc" {...fadeInUp}>
                RealEstate was founded on the principle that the journey to a new home should be as seamless as the destination itself. We focus on transparency, design, and long-term value.
              </motion.p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Grid Based Info - No Images */}
      <section className="info-grid-section">
        <Container>
          <Row className="g-0 border-top border-bottom">
            <Col md={4} className="info-box border-end">
              <motion.div {...fadeInUp}>
                <span className="box-num">01</span>
                <h4>The Vision</h4>
                <p>To redefine the standard of luxury living in Kerala through verified listings and ethical consultancy.</p>
              </motion.div>
            </Col>
            <Col md={4} className="info-box border-end">
              <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
                <span className="box-num">02</span>
                <h4>The Mission</h4>
                <p>Ensuring every client finds a space that matches their lifestyle, backed by 100% legal transparency.</p>
              </motion.div>
            </Col>
            <Col md={4} className="info-box">
              <motion.div {...fadeInUp} transition={{ delay: 0.4 }}>
                <span className="box-num">03</span>
                <h4>The Promise</h4>
                <p>From the first site visit to the final registration, we stay by your side as a trusted partner.</p>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Minimal Stats Section */}
      <section className="minimal-stats py-5">
        <Container>
          <Row className="text-center g-4">
            <Col md={3} sm={6}>
              <div className="stat-card">
                <h3>12+</h3>
                <p>Years of Trust</p>
              </div>
            </Col>
            <Col md={3} sm={6}>
              <div className="stat-card">
                <h3>850+</h3>
                <p>Homes Delivered</p>
              </div>
            </Col>
            <Col md={3} sm={6}>
              <div className="stat-card">
                <h3>15</h3>
                <p>Prime Districts</p>
              </div>
            </Col>
            <Col md={3} sm={6}>
              <div className="stat-card">
                <h3>100%</h3>
                <p>Legal Verification</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Shared Modern Footer */}
      <footer className="modern-footer">
        <div className="footer-glow"></div>
        <Container>
          <Row className="gy-5">
            <Col lg={4}>
              <h2 className="footer-logo">RealEstate<span>.</span></h2>
              <p className="footer-text">Elevating your living experience with premium properties across Kerala.</p>
              <div className="social-tray">
                {['facebook', 'instagram', 'twitter', 'linkedin'].map(icon => (
                  <div key={icon} className="social-item"><i className={`bi bi-${icon}`}></i></div>
                ))}
              </div>
            </Col>
            <Col lg={2} className="footer-links">
              <h5>Explore</h5>
              <ul className="list-unstyled">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/properties">Properties</Link></li>
                <li><Link to="/About">About</Link></li>
              </ul>
            </Col>
            <Col lg={3} className="footer-links">
              <h5>Services</h5>
              <ul className="list-unstyled">
                <li><Link to="#">Consultation</Link></li>
                <li><Link to="#">Legal Help</Link></li>
              </ul>
            </Col>
            <Col lg={3}>
              <h5>Newsletter</h5>
              <div className="newsletter-input">
                <input type="email" placeholder="Enter email" />
                <button><i className="bi bi-arrow-right"></i></button>
              </div>
            </Col>
          </Row>
          <div className="footer-bottom"><p>&copy; 2026 RealEstate Kerala.</p></div>
        </Container>
      </footer>
    </div>
  );
}