import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import "./navbar.css";
import "./about.css";

export default function About() {
  const fadeUp = {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
  };

  const staggerContainer = {
    initial: {},
    whileInView: {
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <div className="about-page">
      {/* ===== NAVBAR (UNCHANGED) ===== */}
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

      {/* ===== PREMIUM HERO ===== */}
      <section className="about-hero-luxe">
        <div className="hero-overlay"></div>
        <Container className="position-relative">
          <Row className="justify-content-center text-center">
            <Col lg={9}>
              <motion.div {...fadeUp}>
                <span className="premium-badge">Since 2014</span>
                <h1 className="display-3 fw-bold text-white mb-4">
                  Crafting <span className="text-accent">Legacies</span>, <br/>Not Just Buildings.
                </h1>
                <p className="hero-subtext">
                  RealEstate Kerala blends architectural excellence with the serenity of God's Own Country. 
                  We don't just sell property; we curate lifestyles.
                </p>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ===== INFO GRID WITH STAGGER ===== */}
      <section className="info-grid-section">
        <Container>
          <motion.div 
            variants={staggerContainer} 
            initial="initial" 
            whileInView="whileInView" 
            viewport={{ once: true }}
          >
            <Row className="g-4">
              {[
                { n: "01", t: "The Vision", d: "Redefining premium living in Kerala with verified luxury listings and honest consultation." },
                { n: "02", t: "The Mission", d: "Helping families find homes that fit their unique lifestyle with complete legal transparency." },
                { n: "03", t: "The Promise", d: "From initial site visits to final registration, we remain your lifelong trusted partner." }
              ].map((item, index) => (
                <Col md={4} key={index}>
                  <motion.div variants={fadeUp} className="luxury-info-card">
                    <span className="card-index">{item.n}</span>
                    <h4>{item.t}</h4>
                    <p>{item.d}</p>
                    <div className="card-line"></div>
                  </motion.div>
                </Col>
              ))}
            </Row>
          </motion.div>
        </Container>
      </section>

      {/* ===== STATS WITH GLOW ===== */}
      <section className="stats-glass-section py-5">
        <Container>
          <Row className="text-center g-4">
            {[
              { value: "12+", label: "Years of Trust" },
              { value: "850+", label: "Homes Delivered" },
              { value: "15", label: "Prime Districts" },
              { value: "100%", label: "Legal Verified" }
            ].map((item, i) => (
              <Col md={3} sm={6} key={i}>
                <motion.div
                  className="stat-card-luxe"
                  whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(140, 85, 170, 0.2)" }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                >
                  <h3 className="stat-number">{item.value}</h3>
                  <p className="stat-label">{item.label}</p>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* ===== FOOTER (UNCHANGED STRUCTURE) ===== */}
      <footer className="modern-footer">
        <Container>
          <Row className="gy-5">
            <Col lg={4}>
              <h2 className="footer-logo">RealEstate<span>.</span></h2>
              <p className="footer-text">Elevating your living experience with premium properties across Kerala.</p>
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
                <li>Consultation</li>
                <li>Legal Assistance</li>
              </ul>
            </Col>
            <Col lg={3}>
              <h5>Newsletter</h5>
              <div className="newsletter-wrapper">
                <input type="email" placeholder="Your premium email" className="luxe-input" />
                <button className="luxe-btn">→</button>
              </div>
            </Col>
          </Row>
          <div className="footer-bottom">
            <p>© 2026 RealEstate Kerala | The Gold Standard in Realty</p>
          </div>
        </Container>
      </footer>
    </div>
  );
}