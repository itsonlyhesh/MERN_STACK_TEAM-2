import { useState } from 'react';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="contact-page">
      <div className="section-header">
        <h1 className="section-title">Get in Touch</h1>
        <p className="section-subtitle">We would love to hear from you. Send us a message or visit our mall location.</p>
      </div>

      <div className="checkout-grid" style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {/* Contact Form */}
        <div className="form-card">
          <h3 style={{ marginBottom: '1.25rem' }}>Send Us a Message</h3>
          {submitted ? (
            <div style={{ background: '#ECFDF5', border: '1px solid #10B981', color: '#065F46', padding: '1.25rem', borderRadius: '8px' }}>
              <strong>Thank you for contacting Book Haven!</strong>
              <p style={{ marginTop: '0.25rem', fontSize: '0.9rem' }}>We have received your message and will respond within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Your Name *</label>
                <input type="text" className="form-control" placeholder="Jane Doe" required />
              </div>
              <div className="form-group">
                <label>Email Address *</label>
                <input type="email" className="form-control" placeholder="jane@example.com" required />
              </div>
              <div className="form-group">
                <label>Subject</label>
                <input type="text" className="form-control" placeholder="Book Inquiry / Order Support" required />
              </div>
              <div className="form-group">
                <label>Message *</label>
                <textarea className="form-control" rows="5" placeholder="How can we help you today?" required></textarea>
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                Send Message 📩
              </button>
            </form>
          )}
        </div>

        {/* Contact Info Card */}
        <div className="summary-box">
          <h3 style={{ marginBottom: '1.25rem' }}>Store Location</h3>
          <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1.5rem' }}>
            📍 <strong>Book Haven Store</strong><br />
            2nd Floor, Central Shopping Mall<br />
            100 Bookstore Boulevard<br />
            New York, NY 10001
          </p>

          <h4 style={{ marginBottom: '0.5rem' }}>Operating Hours</h4>
          <p style={{ color: '#475569', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            Monday - Saturday: 9:00 AM - 9:00 PM<br />
            Sunday: 10:00 AM - 6:00 PM
          </p>

          <h4 style={{ marginBottom: '0.5rem' }}>Direct Helpline</h4>
          <p style={{ color: '#4F46E5', fontWeight: 700 }}>📞 (555) 234-BOOK</p>
          <p style={{ color: '#475569', fontSize: '0.85rem' }}>✉️ support@bookhaven.com</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
