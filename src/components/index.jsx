import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";
import "./navbar.css";

// Assets
import img1 from './villa.jpg';
import img2 from './aparmen.jpg';
import img3 from './house.jpg';

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Index() {
  const navigate = useNavigate();
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');

  // Scroll Animation Logic
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
    };

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

  const handleSearch = () => {
    navigate(`/properties?type=${type}&location=${location}`);
  };

  return (
    <>
      {/* NAVBAR - Kept exactly as your original structure */}
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

      {/* HERO SECTION */}
      <div className="hero">
        <div className="hero-content hero-animate">
          <h1>Find Your Dream Home</h1>
          <p>Buy, Rent & Sell properties with ease</p>

          <div className="search-box glass-effect">
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />

            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">Property Type</option>
              <option value="House">House</option>
              <option value="Apartment">Apartment</option>
              <option value="Land">Land</option>
            </select>

            <button className="search-btn-glow" onClick={handleSearch}>Search</button>
          </div>
        </div>
      </div>

      {/* FEATURED PROPERTIES */}
      <div className="section">
        <h2 className="reveal">Featured Properties</h2>

        <div className="property-grid">
          {/* Card 1 */}
          <div className="property-card reveal delay-1">
            <div className="img-wrapper">
              <img src={img1} alt="Luxury Villa" />
              <div className="price-tag">₹85L</div>
            </div>
            <h3>Luxury Villa</h3>
            <p>Kochi, Kerala</p>
          </div>

          {/* Card 2 */}
          <div className="property-card reveal delay-2">
            <div className="img-wrapper">
              <img src={img2} alt="Modern Apartment" />
              <div className="price-tag">₹45L</div>
            </div>
            <h3>Modern Apartment</h3>
            <p>Calicut, Kerala</p>
          </div>

          {/* Card 3 */}
          <div className="property-card reveal delay-3">
            <div className="img-wrapper">
              <img src={img3} alt="Family House" />
              <div className="price-tag">₹65L</div>
            </div>
            <h3>Family House</h3>
            <p>Trivandrum, Kerala</p>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="modern-footer">
        <div className="footer-glow"></div>
        <div className="container">
          <div className="row gy-5">
            <div className="col-lg-4">
              <h2 className="footer-logo">RealEstate<span>.</span></h2>
              <p className="footer-text">Elevating your living experience with premium properties across Kerala.</p>
              
              <div className="social-tray">
                <div className="social-item">f</div>
                <div className="social-item">t</div>
                <div className="social-item">in</div>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 RealEstate Kerala. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}