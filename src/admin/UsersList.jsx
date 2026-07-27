import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../api/config';

/**
 * UsersList — fetches all users from the backend and displays them
 * with Edit and Delete buttons, plus a button to add a new user.
 * Note: passwords are never returned by the backend, so they are not shown here.
 */
export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch all users when the page loads
  const loadUsers = () => {
    setLoading(true);
    fetch(`${API_URL}/users`)
      .then(res => res.json())
      .then(result => {
        if (result.success) {
          setUsers(result.data);
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

  // Delete a user by id
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      const response = await fetch(`${API_URL}/users/${id}`, { method: 'DELETE' });
      const result = await response.json();

      if (result.success) {
        setUsers(prev => prev.filter(u => u.id !== id));
      } else {
        alert('Could not delete the user.');
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
          style={{ marginBottom: '1.5rem', display: 'inline-block' }}
        >
          + Add User
        </Link>

        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {!loading && users.length === 0 && <p>No users yet. Add one above.</p>}

        <div className="admin-list">
          {users.map((user) => (
            <div key={user.id} className="admin-list-item card">
              <div>
                <h3>{user.firstname} {user.lastname}</h3>
                <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>
                  {user.email}
                </p>
              </div>
              <div className="admin-actions">
                <Link to={`/admin/users/edit/${user.id}`} className="btn btn-outline">
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(user.id)}
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
