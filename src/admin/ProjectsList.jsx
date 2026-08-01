import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiFetch } from '../api/auth';

//ProjectsList lists all projects from the backend.
//Delete requires authentication, so requests go through apiFetch,
//which attaches the Authorization token automatically.
export default function ProjectsList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadProjects = () => {
    setLoading(true);
    apiFetch('/projects')
      .then(res => res.json())
      .then(result => {
        if (result.success) {
          setItems(result.data);
        } else {
          setError('Could not load projects.');
        }
      })
      .catch(() => setError('Could not connect to the server.'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;

    try {
      const response = await apiFetch(`/projects/${id}`, { method: 'DELETE' });
      const result = await response.json();

      if (result.success) {
        setItems(prev => prev.filter(i => i.id !== id));
      } else {
        alert(result.message || 'Could not delete the project.');
      }
    } catch (err) {
      alert('Could not connect to the server.');
    }
  };

  return (
    <main className="section">
      <div className="container">
        <h1 className="page-title">Manage Projects</h1>

        <Link
          to="/admin/projects/new"
          className="btn"
          data-cy="add-project"
          style={{ marginBottom: '1.5rem', display: 'inline-block' }}
        >
          + Add Project
        </Link>

        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {!loading && items.length === 0 && <p>No projects yet. Add one above.</p>}

        <div className="admin-list">
          {items.map((item) => (
            <div key={item.id} className="admin-list-item card">
              <div>
                <h3>{item.title}</h3>
                <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>
                  {item.description}
                </p>
              </div>
              <div className="admin-actions">
                <Link to={`/admin/projects/edit/${item.id}`} className="btn btn-outline">
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
