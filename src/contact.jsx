import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../src/index.css';
import './contact.css';

/*Contact Page*/
export default function Contact() {
  const navigate = useNavigate();

  // Form state controlled inputs
  const [formData, setFormData] = useState({
    firstName:     '',
    lastName:      '',
    contactNumber: '',
    email:         '',
    message:       '',
  });

  // Error state for basic validation
  const [errors, setErrors] = useState({});

  /**
   * handleChange
   * Updates the form state whenever a field value changes.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear the error for this field as the user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  /**
   * validate
   * Basic client side validation before submission.
   * Returns true if the form is valid.
   */
  const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim())     newErrors.firstName     = 'First name is required.';
    if (!formData.lastName.trim())      newErrors.lastName      = 'Last name is required.';
    if (!formData.email.trim())         newErrors.email         = 'Email is required.';
    if (!formData.message.trim())       newErrors.message       = 'Please write a message.';
    // Simple email format check
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * handleSubmit
   * Validates the form and redirects to the Home page on success.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // send formData to backend / email service
    console.log('Form submitted:', formData);

    // Redirect to Home page after successful submission
    navigate('/');
  };

  return (
    <main className="section">
      <div className="container">

        {/* Page header */}
        <div className="accent-line" />
        <h1 className="page-title">Contact Me</h1>
        <p className="page-subtitle">
          Have a project in mind or just want to connect? Send me a message.
        </p>

        <div className="contact-layout">

          {/*Contact info panel*/}
          <aside className="contact-info card">
            <h3 className="contact-info-title">Get In Touch</h3>

            <div className="contact-detail">
              <span className="contact-icon">✉️</span>
              <div>
                <p className="contact-label">Email</p>
                <a href="mailto:omeryousif.dev@gmail.com">omeryousif.dev@gmail.com</a>
              </div>
            </div>

            <div className="contact-detail">
              <span className="contact-icon">📍</span>
              <div>
                <p className="contact-label">Location</p>
                <p className="contact-value">London, Ontario, Canada</p>
              </div>
            </div>

            <div className="contact-detail">
              <span className="contact-icon">🐙</span>
              <div>
                <p className="contact-label">GitHub</p>
                <a href="https://github.com/omerf9" target="_blank" rel="noopener noreferrer">
                  github.com/omerf9
                </a>
              </div>
            </div>
          </aside>

          {/* Contact form */}
          <form className="contact-form" onSubmit={handleSubmit} noValidate>

            {/* Name row */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name *</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First name"
                  autoFocus
                />
                {errors.firstName && <span className="form-error">{errors.firstName}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last Name *</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last name"
                />
                {errors.lastName && <span className="form-error">{errors.lastName}</span>}
              </div>
            </div>

            {/* Contact number */}
            <div className="form-group">
              <label htmlFor="contactNumber">Contact Number</label>
              <input
                type="tel"
                id="contactNumber"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                placeholder="+1 (416) 555-0000"
              />
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
              />
              {errors.email && <span className="form-error">{errors.email}</span>}
            </div>

            {/* Message */}
            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell me about your project or what you need help with..."
              />
              {errors.message && <span className="form-error">{errors.message}</span>}
            </div>

            {/* Submit redirects to Home on success */}
            <button type="submit" className="btn" style={{ width: '100%' }}>
              Send Message →
            </button>

          </form>
        </div>
      </div>
    </main>
  );
}
