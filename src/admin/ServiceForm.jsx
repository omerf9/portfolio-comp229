import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL } from '../api/config';

/**
 * ServiceForm — handles BOTH adding a new service and editing an existing one.
 * If there's an :id in the URL, it's edit mode. Otherwise, it's add mode.
 */
export default function ServiceForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    title: '',
    description: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // If editing, fetch the existing service and fill the form
  useEffect(() => {
    if (isEdit) {
      fetch(`${API_URL}/services/${id}`)
        .then(res => res.json())
        .then(result => {
          if (result.success) {
            const s = result.data;
            setForm({
              title:       s.title || '',
              description: s.description || '',
            });
          }
        })
        .catch(() => setError('Could not load the service.'));
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

    try {
      const response = await fetch(
        isEdit ? `${API_URL}/services/${id}` : `${API_URL}/services`,
        {
          method: isEdit ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        }
      );

      const result = await response.json();

      if (result.success) {
        navigate('/admin/services');
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
        <h1 className="page-title">{isEdit ? 'Edit Service' : 'Add Service'}</h1>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input name="title" value={form.title} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn" disabled={loading}>
            {loading ? 'Saving...' : (isEdit ? 'Update Service' : 'Add Service')}
          </button>
        </form>
      </div>
    </main>
  );
}
