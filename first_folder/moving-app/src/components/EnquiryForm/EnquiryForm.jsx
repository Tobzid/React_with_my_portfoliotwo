import React, { useState, useRef } from 'react';
import { db } from '../firebase';
import { ref, push } from 'firebase/database';
import './EnquiryForm.css';

const EnquiryForm = () => {
  const formRef = useRef();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState({ loading: false, success: false, error: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: '' });

    try {
      // 1. Save to Firebase database
      const enquiriesRef = ref(db, 'enquiries');
      await push(enquiriesRef, {
        ...formData,
        timestamp: new Date().toISOString()
      });

      // 2. Send email via your Render backend (/api/enquiry route)
      const response = await fetch('https://react-with-my-portfoliotwo.onrender.com/api/enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send email via backend server');
      }

      setStatus({ loading: false, success: true, error: '' });
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      console.error('Submission error:', err);
      setStatus({ loading: false, success: false, error: 'Failed to send message. Please try again.' });
    }
  };

  return (
    <div className="enquiry-container">
      <h2>Get a Quote / Send an Enquiry</h2>
      {status.success && <p className="enquiry-success">Message sent to our team successfully!</p>}
      {status.error && <p className="enquiry-error">{status.error}</p>}

      <form ref={formRef} onSubmit={handleSubmit} className="enquiry-form">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="enquiry-input"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="enquiry-input"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Your Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
          className="enquiry-input"
        />
        <textarea
          name="message"
          placeholder="Your Message"
          rows="4"
          value={formData.message}
          onChange={handleChange}
          required
          className="enquiry-input"
        />
        <button type="submit" disabled={status.loading} className="enquiry-button">
          {status.loading ? 'Sending...' : 'Send Enquiry'}
        </button>
      </form>
    </div>
  );
};

export default EnquiryForm;