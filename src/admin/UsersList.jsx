import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiFetch } from '../api/auth';

//UsersList lists all users from the backend.
//Delete requires authentication, so requests go through apiFetch,
//which attaches the Authorization token automatically.
export default function UsersList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadUsers = () => {
    setLoading(true);
    apiFetch('/users')
      .then(res => res.json())
      .then(result => {
        if (result.success) {
          setItems(result.data);
        } else {
          setError('Could not load users.');
        }
      })
      .catch(() => setError('Could not connect to the server.'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      const response = await apiFetch(`/users/${id}`, { method: 'DELETE' });
      const result = await response.json();

      if (result.success) {
        setItems(prev => prev.filter(i => i.id !== id));
      } else {
        alert(result.message || 'Could not delete the user.');
      }
    } catch (err) {
      alert('Could not connect to the server.');
    }
  };

  return (
    <main className="section">
      <div className="container">
        <h1 className="page-title">Manage Users</h1>

        <Link
          to="/admin/users/new"
          className="btn"
          data-cy="add-user"
          style={{ marginBottom: '1.5rem', display: 'inline-block' }}
        >
          + Add User
        </Link>

        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {!loading && items.length === 0 && <p>No users yet. Add one above.</p>}

        <div className="admin-list">
          {items.map((item) => (
            <div key={item.id} className="admin-list-item card">
              <div>
                <h3>{item.firstname} {item.lastname}</h3>
                <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>
                  {item.email}
                </p>
              </div>
              <div className="admin-actions">
                <Link to={`/admin/users/edit/${item.id}`} className="btn btn-outline">
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
