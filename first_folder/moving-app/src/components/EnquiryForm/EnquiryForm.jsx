import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { db } from './firebase';
import { ref, push } from 'firebase/database';

/*
I am using emailJs for this and I installed it on with this npm install @emailjs/browser
*/ 

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: '' });

    // Optional: Save to Firebase first
    const enquiriesRef = ref(db, 'enquiries');
    push(enquiriesRef, {
      ...formData,
      timestamp: new Date().toISOString()
    });

    // Send email directly to your inbox via EmailJS
    emailjs.send(
      'YOUR_SERVICE_ID',     // Replace with your EmailJS Service ID
      'YOUR_TEMPLATE_ID',    // Replace with your EmailJS Template ID
      {
        from_name: formData.name,
        reply_to: formData.email,
        phone_number: formData.phone,
        message: formData.message,
      },
      'YOUR_PUBLIC_KEY'      // Replace with your EmailJS Public Key
    )
    .then(() => {
      setStatus({ loading: false, success: true, error: '' });
      setFormData({ name: '', email: '', phone: '', message: '' });
    })
    .catch((err) => {
      console.error('Email send error:', err);
      setStatus({ loading: false, success: false, error: 'Failed to send message. Please try again.' });
    });
  };

  return (
    <div style={styles.container}>
      <h2>Get a Quote / Send an Enquiry</h2>
      {status.success && <p style={styles.success}>Message sent to our team successfully!</p>}
      {status.error && <p style={styles.error}>{status.error}</p>}

      <form ref={formRef} onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="tel"
          name="phone"
          placeholder="Your Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <textarea
          name="message"
          placeholder="Your Message"
          rows="4"
          value={formData.message}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <button type="submit" disabled={status.loading} style={styles.button}>
          {status.loading ? 'Sending...' : 'Send Enquiry'}
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: { maxWidth: '480px', margin: '20px auto', padding: '20px', borderRadius: '8px', border: '1px solid #ddd' },
  form: { display: 'flex', flexDirection: 'column', gap: '12px' },
  input: { padding: '10px', borderRadius: '4px', border: '1px solid #ccc' },
  button: { padding: '12px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  success: { color: 'green', fontWeight: 'bold' },
  error: { color: 'red', fontWeight: 'bold' }
};

export default EnquiryForm;