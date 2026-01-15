import "./index.css";
import "./navbar.css";
import img1 from './villa.jpg'
import img2 from './aparmen.jpg'
import 'bootstrap/dist/css/bootstrap.min.css';
import img3 from './house.jpg'
import { Link } from "react-router-dom";
export default function Index(){
  return (
    <>
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
        <Link to="/login">
        <button className="login-btn">Login</button></Link>
        <Link to="/reg">
        <button className="register-btn">Register</button></Link>
      </div>
    </nav>


      <div className="hero">
        <div className="hero-content">
          <h1>Find Your Dream Home</h1>
          <p>Buy, Rent & Sell properties with ease</p>

          <div className="search-box">
            <input type="text" placeholder="Location" />
            <select>
              <option>Property Type</option>
              <option>House</option>
              <option>Apartment</option>
              <option>Land</option>
            </select>
            <button>Search</button>
          </div>
        </div>
      </div>
      <div className="section">
        <h2>Featured Properties</h2>

        <div className="property-grid">
          <div className="property-card">
            <img src={img1} alt="Property" />
            <h3>Luxury Villa</h3>
            <p>₹85,00,000 · Kochi</p>
          </div>

          <div className="property-card">
            <img src={img2} alt="Property" />
            <h3>Modern Apartment</h3>
            <p>₹45,00,000 · Calicut</p>
          </div>

          <div className="property-card">
            <img src={img3} alt="Property" />
            <h3>Family House</h3>
            <p>₹65,00,000 · Trivandrum</p>
          </div>
        </div>
      </div>
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
        </>
    );

}