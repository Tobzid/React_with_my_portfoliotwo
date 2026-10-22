require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Resend } = require('resend');

const app = express();

app.use(cors());
app.use(express.json());

const resend = new Resend(process.env.RESEND_API_KEY);

// Single unified route for handling both general enquiries and quote calculator leads
app.post('/api/enquiry', async (req, res) => {
  const { name, email, phone, message, fromZip, toZip, moveSize } = req.body;

  // Ensure at least an email or phone and some form of contact info is present
  if (!email && !phone) {
    return res.status(400).json({ success: false, message: 'Missing contact information' });
  }

  try {
    const isQuote = fromZip || toZip || moveSize;
    
    await resend.emails.send({
      from: 'Quotes <onboarding@resend.dev>',
      to: 'tobzid2013@gmail.com',
      reply_to: email,
      subject: isQuote 
        ? `New Quote Request: ${fromZip || 'N/A'} to ${toZip || 'N/A'}` 
        : `New Moving Enquiry from ${name || 'Customer'}`,
      html: `
        <h2>${isQuote ? 'New Quote Calculator Submission' : 'New Customer Enquiry'}</h2>
        ${name ? `<p><strong>Name:</strong> ${name}</p>` : ''}
        <p><strong>Email:</strong> ${email || 'N/A'}</p>
        <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
        ${fromZip ? `<p><strong>From ZIP:</strong> ${fromZip}</p>` : ''}
        ${toZip ? `<p><strong>To ZIP:</strong> ${toZip}</p>` : ''}
        ${moveSize ? `<p><strong>Move Size:</strong> ${moveSize}</p>` : ''}
        ${message ? `<p><strong>Message:</strong> ${message}</p>` : ''}
      `
    });

    res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Failed to send email.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));