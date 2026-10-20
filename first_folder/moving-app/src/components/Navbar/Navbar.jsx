import { useState } from 'react';
import { FaBars, FaTimes, FaPhoneAlt } from 'react-icons/fa';
import './Navbar.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        {/* Brand Logo */}
        <a href="#home" className="navbar-logo" onClick={closeMenu}>
          Coastal<span>Movers</span>
        </a>

        {/* Desktop Links */}
        <nav className="nav-menu-desktop">
          <a href="#home" className="nav-link">Home</a>
          <a href="#services" className="nav-link">Services</a>
          <a href="#about" className="nav-link">About Us</a>
          <a href="#contact" className="nav-link">Contact</a>
        </nav>

        {/* Desktop Actions */}
        <div className="navbar-cta-desktop">
          <a href="tel:15857171210" className="phone-btn">
            <FaPhoneAlt /> 8587171210
          </a>
          <a href="#contact" className="quote-btn">
            Get Quote
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button className="hamburger-btn" onClick={toggleMenu} aria-label="Toggle navigation">
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Dark Overlay */}
      <div className={`mobile-overlay ${isOpen ? 'show' : ''}`} onClick={closeMenu}></div>

      {/* Mobile Left-Side Drawer */}
      <aside className={`mobile-drawer ${isOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <a href="#home" className="navbar-logo" onClick={closeMenu}>
            Coastal<span>Movers</span>
          </a>
          <button className="close-btn" onClick={closeMenu} aria-label="Close menu">
            <FaTimes />
          </button>
        </div>

        <nav className="drawer-links">
          <a href="#home" onClick={closeMenu} className="drawer-link">Home</a>
          <a href="#services" onClick={closeMenu} className="drawer-link">Services</a>
          <a href="#about" onClick={closeMenu} className="drawer-link">About Us</a>
          <a href="#contact" onClick={closeMenu} className="drawer-link">Contact</a>
        </nav>

        <div className="drawer-cta">
          <a href="tel:15857171210" className="phone-btn">
            <FaPhoneAlt /> Call +1 (585) 717-1210
          </a>
          <a href="#contact" onClick={closeMenu} className="quote-btn">
            Get a Free Quote
          </a>
        </div>
      </aside>
    </header>
  );
}

export default Navbar;