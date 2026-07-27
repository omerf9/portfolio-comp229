import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../api/config';

/**
 * ReferencesList — fetches all references from the backend and displays them
 * with Edit and Delete buttons, plus a button to add a new reference.
 */
export default function ReferencesList() {
  const [references, setReferences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch all references when the page loads
  const loadReferences = () => {
    setLoading(true);
    fetch(`${API_URL}/references`)
      .then(res => res.json())
      .then(result => {
        if (result.success) {
          setReferences(result.data);
        } else {
          setError('Could not load references.');
        }
      })
      .catch(() => setError('Could not connect to the server.'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadReferences();
  }, []);

  // Delete a reference by id
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this reference?')) return;

    try {
      const response = await fetch(`${API_URL}/references/${id}`, { method: 'DELETE' });
      const result = await response.json();

      if (result.success) {
        setReferences(prev => prev.filter(r => r.id !== id));
      } else {
        alert('Could not delete the reference.');
      }
    } catch (err) {
      alert('Could not connect to the server.');
    }
  };

  return (
    <main className="section">
      <div className="container">
        <h1 className="page-title">Manage References</h1>

        <Link
          to="/admin/references/new"
          className="btn"
          style={{ marginBottom: '1.5rem', display: 'inline-block' }}
        >
          + Add Reference
        </Link>

        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {!loading && references.length === 0 && <p>No references yet. Add one above.</p>}

        <div className="admin-list">
          {references.map((reference) => (
            <div key={reference.id} className="admin-list-item card">
              <div>
                <h3>{reference.name}</h3>
                <p style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>
                  {reference.position} — {reference.company}
                </p>
                <p style={{ color: 'var(--muted)', fontSize: '0.9rem', fontStyle: 'italic' }}>
                  {reference.testimonial}
                </p>
              </div>
              <div className="admin-actions">
                <Link to={`/admin/references/edit/${reference.id}`} className="btn btn-outline">
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(reference.id)}
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
