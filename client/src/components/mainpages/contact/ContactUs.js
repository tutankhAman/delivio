import React, { useState } from 'react';
import './contactUs.css';

const ContactUs = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      name,
      email,
      message: description,
      access_key: '97bcfccb-c64d-4a4c-8948-703a3332ffe6',
    };

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        setSuccessMessage('Your message has been sent successfully!');
        setName('');
        setEmail('');
        setDescription('');
        setErrorMessage('');
      } else {
        setErrorMessage('There was an error sending your message. Please try again.');
      }
    } catch (error) {
      setErrorMessage('There was an error sending your message. Please try again.');
    }
  };

  return (
    <div className="contact-us-container">
      <div className="contact-form-section">
        <h1>Contact Us</h1>
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter your name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Message</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              placeholder="Type your message here..."
            />
          </div>
          <button type="submit" className="submit-button">Send Message</button>
          {successMessage && <p className="success-message">{successMessage}</p>}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
      </div>

      <div className="welcome-message">
        <h2>We love to hear from you!</h2>
        <p>Your feedback helps us improve and serve you better. Don't hesitate to reach out with questions, suggestions, or concerns.</p>
      </div>
    </div>
  );
};

export default ContactUs;
