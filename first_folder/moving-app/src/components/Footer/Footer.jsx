import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaShieldAlt, FaTruck, FaClock } from 'react-icons/fa';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer-section">
      {/* Top Value Badges Bar */}
      <div className="footer-top-bar">
        <div className="footer-container top-bar-grid">
          <div className="value-badge">
            <FaShieldAlt className="badge-icon" />
            <div>
              <h4>Fully Licensed & Insured</h4>
              <p>USDOT #3829104 | MC #1092831</p>
            </div>
          </div>
          <div className="value-badge">
            <FaTruck className="badge-icon" />
            <div>
              <h4>Nationwide Moving</h4>
              <p>Local & Long-Distance Services</p>
            </div>
          </div>
          <div className="value-badge">
            <FaClock className="badge-icon" />
            <div>
              <h4>24/7 Customer Support</h4>
              <p>Dedicated Move Coordinators</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="footer-container footer-main-grid">
        {/* Column 1: Company Branding & Credentials */}
        <div className="footer-col brand-col">
          <a href="#home" className="footer-logo">
            Coastal<span>Movers</span>
          </a>
          <p className="brand-desc">
            Premium, stress-free residential and commercial moving services. Fully credentialed, background-checked crews dedicated to keeping your belongings safe.
          </p>
          <div className="license-info">
            <span><strong>USDOT:</strong> 3829104</span>
            <span><strong>MC:</strong> 1092831</span>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="footer-col">
          <h4 className="footer-title">Quick Links</h4>
          <ul className="footer-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#services">Moving Services</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#contact">Get a Free Quote</a></li>
          </ul>
        </div>

        {/* Column 3: Our Services */}
        <div className="footer-col">
          <h4 className="footer-title">Our Services</h4>
          <ul className="footer-links">
            <li><a href="#services">Local House Moving</a></li>
            <li><a href="#services">Long-Distance Moving</a></li>
            <li><a href="#services">Commercial & Office</a></li>
            <li><a href="#services">Full Packing & Storage</a></li>
          </ul>
        </div>

        {/* Column 4: Contact Info & Emergency Hotline */}
        <div className="footer-col contact-col">
          <h4 className="footer-title">Contact & Inquiries</h4>
          <ul className="contact-info-list">
            <li>
              <FaPhoneAlt className="contact-icon" />
              <a href="tel:15857171210">+1 (585) 717-1210</a>
            </li>
            <li>
              <FaEnvelope className="contact-icon" />
              <a href="mailto:Tobzid2013@gmail.com">Tobzid2013@gmail.com</a>
            </li>
            <li>
              <FaMapMarkerAlt className="contact-icon" />
              <span>Headquarters & Dispatch Center</span>
            </li>
          </ul>
          <a href="#contact" className="footer-cta-btn">
            Calculate Move Cost
          </a>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="footer-bottom">
        <div className="footer-container bottom-flex">
          <p>&copy; {new Date().getFullYear()} Coastal Movers. All rights reserved.</p>
          <div className="bottom-links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#licensing">FMCSA Licensing</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;