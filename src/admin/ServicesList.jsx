import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../api/config';

/**
 * ServicesList — fetches all services from the backend and displays them
 * with Edit and Delete buttons, plus a button to add a new service.
 */
export default function ServicesList() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch all services when the page loads
  const loadServices = () => {
    setLoading(true);
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
  };

  useEffect(() => {
    loadServices();
  }, []);

  // Delete a service by id
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;

    try {
      const response = await fetch(`${API_URL}/services/${id}`, { method: 'DELETE' });
      const result = await response.json();

      if (result.success) {
        setServices(prev => prev.filter(s => s.id !== id));
      } else {
        alert('Could not delete the service.');
      }
    } catch (err) {
      alert('Could not connect to the server.');
    }
  };

  return (
    <main className="section">
      <div className="container">
        <h1 className="page-title">Manage Services</h1>

        <Link
          to="/admin/services/new"
          className="btn"
          style={{ marginBottom: '1.5rem', display: 'inline-block' }}
        >
          + Add Service
        </Link>

        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {!loading && services.length === 0 && <p>No services yet. Add one above.</p>}

        <div className="admin-list">
          {services.map((service) => (
            <div key={service.id} className="admin-list-item card">
              <div>
                <h3>{service.title}</h3>
                <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>
                  {service.description}
                </p>
              </div>
              <div className="admin-actions">
                <Link to={`/admin/services/edit/${service.id}`} className="btn btn-outline">
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(service.id)}
                  className="btn"
                  style={{ background: '#dc2626' }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
