import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import AboutStats from './components/FirstSection/FirstSection'
import WhyChooseUs from './components/WhyChooseUs/WhyChooseUs'
import ServicesSection from './components/ServicesSection/ServicesSection'
import ChatWidget from './components/ChatApp/ChatWidget'
import AdminChat from './components/AdminChat/AdminChat'
import EnquiryForm from './components/EnquiryForm/EnquiryForm'


function App() {
  const [isAdminView, setIsAdminView] = useState(false);

  return (
    <>
      {/* Admin Switcher Button (Bottom Left) */}
      <div style={{ position: 'fixed', bottom: '20px', left: '20px', zIndex: 999999 }}>
        <button 
          onClick={() => setIsAdminView(!isAdminView)}
          style={{
            background: '#ff5a36',
            color: '#ffffff',
            border: 'none',
            padding: '10px 16px',
            borderRadius: '8px',
            fontSize: '13px',
            fontWeight: '700',
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(0,0,0,0.4)'
          }}
        >
          {isAdminView ? '← Back to Website' : 'Open Admin Panel'}
        </button>
      </div>

      {isAdminView ? (
        <div style={{ padding: '2rem 1rem' }}>
          <AdminChat />
        </div>
      ) : (
        <section id="center">
          <Navbar />
          <AboutStats />
          <WhyChooseUs />
          <ServicesSection />
          <ChatWidget />
        <EnquiryForm/>
          <Footer />
        </section>
      )}
    </>
  );
}

export default App;