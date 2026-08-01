import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiFetch } from '../api/auth';

//ReferencesList lists all references from the backend.
//Delete requires authentication, so requests go through apiFetch,
//which attaches the Authorization token automatically.
export default function ReferencesList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadReferences = () => {
    setLoading(true);
    apiFetch('/references')
      .then(res => res.json())
      .then(result => {
        if (result.success) {
          setItems(result.data);
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

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this reference?')) return;

    try {
      const response = await apiFetch(`/references/${id}`, { method: 'DELETE' });
      const result = await response.json();

      if (result.success) {
        setItems(prev => prev.filter(i => i.id !== id));
      } else {
        alert(result.message || 'Could not delete the reference.');
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
          data-cy="add-reference"
          style={{ marginBottom: '1.5rem', display: 'inline-block' }}
        >
          + Add Reference
        </Link>

        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {!loading && items.length === 0 && <p>No references yet. Add one above.</p>}

        <div className="admin-list">
          {items.map((item) => (
            <div key={item.id} className="admin-list-item card">
              <div>
                <h3>{item.name}</h3>
                <p style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>
                  {item.position} — {item.company}
                </p>
                <p style={{ color: 'var(--muted)', fontSize: '0.9rem', fontStyle: 'italic' }}>
                  {item.testimonial}
                </p>
              </div>
              <div className="admin-actions">
                <Link to={`/admin/references/edit/${item.id}`} className="btn btn-outline">
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(item.id)}
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
