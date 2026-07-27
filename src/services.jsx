import React, { useState, useEffect } from 'react';
import '../src/index.css';
import './services.css';
import { API_URL } from './api/config';

/**
 * Services public page.
 * Fetches all services from the backend API instead of hardcoded data.
 */
export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`${API_URL}/services`)
      .then(res => res.json())
      .then(result => {
        if (result.success) {
          setServices(result.data);
        } else {
          setError('Could not load services.');
        }
      })
      .catch(() => setError('Could not connect to the server.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="section">
      <div className="container">

        <div className="accent-line" />
        <h1 className="page-title">Services</h1>
        <p className="page-subtitle">
          What I can help you build, fix, or automate.
        </p>

        {loading && <p>Loading services...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {!loading && !error && services.length === 0 && <p>No services to show yet.</p>}

        <div className="grid-3">
          {services.map((service) => (
            <div key={service.id} className="service-card card">
              <h3 className="service-title">{service.title}</h3>
              <p className="service-desc">{service.description}</p>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}
