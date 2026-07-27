import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL } from '../api/config';

/**
 * UserForm — handles BOTH adding a new user and editing an existing one.
 * If there's an :id in the URL, it's edit mode. Otherwise, it's add mode.
 *
 * Note: the backend never sends passwords back, so on edit the password field
 * starts empty. If it is left empty, the password is not changed.
 */
export default function UserForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // If editing, fetch the existing user and fill the form
  useEffect(() => {
    if (isEdit) {
      fetch(`${API_URL}/users/${id}`)
        .then(res => res.json())
        .then(result => {
          if (result.success) {
            const u = result.data;
            setForm({
              firstname: u.firstname || '',
              lastname:  u.lastname || '',
              email:     u.email || '',
              password:  '', // never pre-filled
            });
          }
        })
        .catch(() => setError('Could not load the user.'));
    }
  }, [id, isEdit]);

  // Update state when any field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // Submit: POST for add, PUT for edit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // On edit, only send the password if the user actually typed a new one
    const payload = { ...form };
    if (isEdit && !payload.password) {
      delete payload.password;
    }

    try {
      const response = await fetch(
        isEdit ? `${API_URL}/users/${id}` : `${API_URL}/users`,
        {
          method: isEdit ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();

      if (result.success) {
        navigate('/admin/users');
      } else {
        setError(result.message || 'Something went wrong.');
      }
    } catch (err) {
      setError('Could not connect to the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="section">
      <div className="container" style={{ maxWidth: '600px' }}>
        <h1 className="page-title">{isEdit ? 'Edit User' : 'Add User'}</h1>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>First Name</label>
            <input name="firstname" value={form.firstname} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Last Name</label>
            <input name="lastname" value={form.lastname} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>
              Password {isEdit && <span style={{ fontWeight: 400 }}>(leave blank to keep current)</span>}
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required={!isEdit}
            />
          </div>

          <button type="submit" className="btn" disabled={loading}>
            {loading ? 'Saving...' : (isEdit ? 'Update User' : 'Add User')}
          </button>
        </form>
      </div>
    </main>
  );
}
