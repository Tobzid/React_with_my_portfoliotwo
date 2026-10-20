import { useState } from 'react';
import { FaHome, FaRoad, FaBuilding, FaBox, FaCheck, FaArrowRight } from 'react-icons/fa';
import './ServicesSection.css';

function ServicesSection() {
  const [activeTab, setActiveTab] = useState('residential');

const handleEstimateClick = (serviceId) => {
  // 1. Target the top form dropdown element
  const selectElement = document.getElementById('moveSize');
  if (selectElement) {
    selectElement.value = serviceId;
    
    // Dispatch a change event so React state updates
    const event = new Event('change', { bubbles: true });
    selectElement.dispatchEvent(event);
  }

  // 2. Smoothly scroll the user straight to the quote card
  const quoteSection = document.getElementById('about');
  if (quoteSection) {
    quoteSection.scrollIntoView({ behavior: 'smooth' });
  }
};



  const servicesData = [
    {
      id: 'residential',
      title: 'Local Residential Moving',
      icon: <FaHome />,
      badge: 'Most Popular',
      tagline: 'Stress-free relocations across town or within the state.',
      description: 'Our experienced crews handle everything from studio apartments to 5-bedroom homes with utmost care, floor protection, and blanket wrapping.',
      features: ['Disassembly & reassembly of furniture', 'Full floor & doorway protection', 'Hourly rates with zero hidden fees', 'Dedicated local moving coordinator']
    },
    {
      id: 'longdistance',
      title: 'Long-Distance & Interstate',
      icon: <FaRoad />,
      badge: '50 States Coverage',
      tagline: 'Secure cross-country logistics with real-time updates.',
      description: 'Moving across state lines requires precision. We provide guaranteed pickup dates, dedicated trucks, and experienced interstate drivers.',
      features: ['Guaranteed delivery windows', 'Dedicated transit (no shared truck mix-ups)', 'DOT-certified insured interstate carriers', 'Live dispatch support hotline']
    },
    {
      id: 'commercial',
      title: 'Commercial & Office Relocation',
      icon: <FaBuilding />,
      badge: 'Minimal Downtime',
      tagline: 'Seamless corporate moves designed to keep business running.',
      description: 'We move office furniture, IT servers, heavy equipment, and file archives safely, working around your schedule (even weekends and nights).',
      features: ['IT server & electronics crating', 'After-hours & weekend availability', 'Cubicle disassembly & reconfiguration', 'Asset tagging & inventory control']
    },
    {
      id: 'packing',
      title: 'Packing & Crating Services',
      icon: <FaBox />,
      badge: 'White Glove',
      tagline: 'Professional packing materials and custom wooden crating.',
      description: 'Save hours of time and protect your fragile items. Our professional packers use commercial-grade materials and custom crates for high-value assets.',
      features: ['Custom wooden crating for art & antiques', 'Heavy-duty wardrobe & dish pack boxes', 'Full or partial packing service options', 'Fragile item bubble wrapping']
    }
  ];

  return (
    <section className="services-section" id="services">
      {/* Decorative Background Twist: Abstract Glow Elements */}
      <div className="services-bg-glow glow-1"></div>
      <div className="services-bg-glow glow-2"></div>

      <div className="services-container">
        
        {/* Section Header */}
        <div className="services-header">
          <span className="services-tag">Expert Solutions</span>
          <h2 className="services-main-title">Tailored Moving Services for Every Need</h2>
          <p className="services-description">
            Whether you are moving down the block or across the country, pick the service tier that fits your timeline and budget.
          </p>
        </div>

        {/* Service Cards Grid */}
        <div className="services-grid">
          {servicesData.map((service) => (
            <div key={service.id} className="service-card">
              
              <div className="service-card-top">
                <div className="service-icon-box">{service.icon}</div>
                <span className="service-badge-pill">{service.badge}</span>
              </div>

              <h3 className="service-title">{service.title}</h3>
              <p className="service-tagline">{service.tagline}</p>
              <p className="service-desc">{service.description}</p>

              <div className="service-divider"></div>

              <ul className="service-features-list">
                {service.features.map((feat, index) => (
                  <li key={index}>
                    <FaCheck className="service-check" /> {feat}
                  </li>
                ))}
              </ul>

              <div className="service-action-footer">
                <a href="#contact" className="service-link-btn"
                onClick={() => handleEstimateClick(service.id)}>
                  Get Rate Estimate <FaArrowRight />
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default ServicesSection;