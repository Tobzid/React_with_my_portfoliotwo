import { useState } from 'react';
import { FaPhoneAlt, FaStar, FaCheckCircle, FaArrowRight, FaShieldAlt, FaCalculator, FaTruck } from 'react-icons/fa';
import './FirstSection.css';

function FirstSection() {
  const [formData, setFormData] = useState({
    fromZip: '',
    toZip: '',
    moveSize: '1-bedroom',
    moveDate: '',
    phone: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="about-stats-section" id="about">
      {/* Background Overlay */}
      <div className="stats-overlay"></div>

      <div className="stats-container">
        
        {/* LEFT PART: Story, Checklist & CTAs */}
        <div className="stats-left">
          <div className="section-badge">
            <FaShieldAlt /> Trusted Nationwide Movers
          </div>
          <h2 className="stats-title">
            Over <span>7,000+</span> Satisfied Customers Moved Safely
          </h2>
          <p className="stats-description">
            Whether you are moving locally across town or long-distance across the country, our experienced crews make your transition smooth, secure, and completely stress-free.
          </p>

          <ul className="stats-check-list">
            <li><FaCheckCircle className="check-icon" /> Fully licensed, bonded, and DOT-insured</li>
            <li><FaCheckCircle className="check-icon" /> Trained, background-checked professional movers</li>
            <li><FaCheckCircle className="check-icon" /> Transparent pricing with zero hidden fees</li>
          </ul>

          <div className="stats-actions">
            <a href="#contact" className="btn-primary">
              Get a Free Quote <FaArrowRight />
            </a>
            <a href="tel:15857171210" className="btn-secondary">
              <FaPhoneAlt /> Call: 8587171210
            </a>
          </div>
        </div>

        {/* RIGHT PART: Quick Free Quote Form */}
        <div className="stats-right">
          <div className="quote-rating-card">
            
            {/* Header Block */}
            <div className="form-card-header">
              <div className="header-title-group">
                <FaCalculator className="quote-header-icon" />
                <h3 className="quote-main-title">Quick Free Quote</h3>
              </div>
              <div className="rating-pill">
                <FaStar className="star-icon" /> 4.9/5 (7,000+ Moves)
              </div>
            </div>

            <hr className="card-divider" />

            {/* Interactive Form */}
            {!submitted ? (
              <form className="quick-quote-form" onSubmit={handleSubmit}>
                <div className="form-grid">
                  <div className="input-group">
                    <label htmlFor="fromZip">From (ZIP Code)</label>
                    <input
                      type="text"
                      id="fromZip"
                      name="fromZip"
                      placeholder="e.g. 90210"
                      maxLength="5"
                      required
                      value={formData.fromZip}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="input-group">
                    <label htmlFor="toZip">To (ZIP Code)</label>
                    <input
                      type="text"
                      id="toZip"
                      name="toZip"
                      placeholder="e.g. 10001"
                      maxLength="5"
                      required
                      value={formData.toZip}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="input-group">
  <label htmlFor="moveSize">Move Type & Size</label>
  <select
    id="moveSize"
    name="moveSize"
    value={formData.moveSize}
    onChange={handleChange}
  >
    <optgroup label="Local Residential">
      <option value="studio">Studio Apartment</option>
      <option value="1-bedroom">1 Bedroom Home</option>
      <option value="2-bedroom">2 Bedroom Home</option>
      <option value="3-plus-bedroom">3+ Bedroom House</option>
    </optgroup>
    
    <optgroup label="Specialized Solutions">
      <option value="longdistance">Long-Distance / Interstate</option>
      <option value="commercial">Commercial / Office Move</option>
      <option value="packing">Packing & Crating Service Only</option>
    </optgroup>
  </select>
</div>

                <button type="submit" className="form-submit-btn">
                  <FaTruck /> Calculate Estimated Cost
                </button>
              </form>
            ) : (
              <div className="quote-success-box">
                <div className="success-badge">✓</div>
                <h4>Estimate Request Received!</h4>
                <p>Our dispatch coordinator is calculating your route rate. We will call you shortly at <strong>{formData.phone}</strong>.</p>
                <button 
                  type="button" 
                  className="reset-form-btn"
                  onClick={() => setSubmitted(false)}
                >
                  Edit Details
                </button>
              </div>
            )}

          </div>
        </div>

      </div>
    </section>
  );
}

export default FirstSection;