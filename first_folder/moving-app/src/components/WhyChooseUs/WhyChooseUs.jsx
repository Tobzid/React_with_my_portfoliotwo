import { 
  FaTruck, 
  FaFileInvoiceDollar, 
  FaClock, 
  FaMapMarkedAlt, 
  FaUserTie, 
  FaBoxOpen 
} from 'react-icons/fa';
import './WhyChooseUs.css';

function WhyChooseUs() {
  const highlights = [
    {
      id: 1,
      icon: <FaTruck />,
      badge: "Proven Track Record",
      title: "4,000+ Moves Coordinated",
      description: "Extensive experience coordinating smooth local and long-distance relocations across the nation."
    },
    {
      id: 2,
      icon: <FaFileInvoiceDollar />,
      badge: "No Hidden Surprises",
      title: "Up-Front, Transparent Estimates",
      description: "Clear, binding quotes upfront with zero surprise fees for stairs, fuel, or heavy items."
    },
    {
      id: 3,
      icon: <FaClock />,
      badge: "Fast Response",
      title: "Under 10 Min Quote Turnaround",
      description: "Our active dispatch team calculates your route and details almost instantly so you can plan fast."
    },
    {
      id: 4,
      icon: <FaMapMarkedAlt />,
      badge: "Interstate Routes",
      title: "Nationwide Coverage",
      description: "Fully licensed, DOT-certified long-haul drivers servicing all 50 states with route tracking."
    },
    {
      id: 5,
      icon: <FaUserTie />,
      badge: "Personalized Support",
      title: "One Point of Contact",
      description: "Direct line to your personal logistics coordinator from packing day until final delivery."
    },
    {
      id: 6,
      icon: <FaBoxOpen />,
      badge: "Full Service",
      title: "Packing & Storage Arranged",
      description: "Professional packing materials, white-glove handling, and secure climate-controlled storage."
    }
  ];

  return (
    <section className="why-choose-section" id="why-choose">
      <div className="why-choose-container">
        
        {/* Section Header */}
        <div className="why-choose-header">
          <span className="why-tag">The Real Advantage</span>
          <h2 className="why-main-title">Why Choose Coastal Moving Services</h2>
          <p className="why-description">
            We eliminated the stress, hidden fees, and uncertainty of moving with transparent pricing and dedicated care.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="why-grid">
          {highlights.map((item) => (
            <div key={item.id} className="why-card">
              <div className="why-card-top">
                <div className="why-icon-box">{item.icon}</div>
                <span className="why-card-badge">{item.badge}</span>
              </div>
              <h3 className="why-card-title">{item.title}</h3>
              <p className="why-card-text">{item.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default WhyChooseUs;