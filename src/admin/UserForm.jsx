import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiFetch } from '../api/auth';

//UserForm handles BOTH adding a new user and editing an existing one.
//Requests go through apiFetch so the Authorization token is sent with them.
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

  useEffect(() => {
    if (isEdit) {
      apiFetch(`/users/${id}`)
        .then(res => res.json())
        .then(result => {
          if (result.success) {
            const d = result.data;
            setForm({
              firstname: d.firstname || '',
              lastname:  d.lastname || '',
              email:     d.email || '',
              password:  '',
            });
          }
        })
        .catch(() => setError('Could not load the user.'));
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const payload = { ...form };

    // On edit, only send the password if a new one was typed
    if (isEdit && !payload.password) {
      delete payload.password;
    }

    try {
      const response = await apiFetch(
        isEdit ? `/users/${id}` : '/users',
        {
          method: isEdit ? 'PUT' : 'POST',
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
            <input type="email" name="email" value={form.email} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>
              Password {isEdit && <span style={{ fontWeight: 400 }}>(leave blank to keep current)</span>}
            </label>
            <input type="password" name="password" value={form.password} onChange={handleChange} required={!isEdit} />
          </div>

          <button type="submit" className="btn" data-cy="save-user" disabled={loading}>
            {loading ? 'Saving...' : (isEdit ? 'Update User' : 'Add User')}
          </button>
        </form>
      </div>
    </main>
  );
}
