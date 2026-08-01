import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiFetch } from '../api/auth';

//ServiceForm handles BOTH adding a new service and editing an existing one.
//Requests go through apiFetch so the Authorization token is sent with them.
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

  useEffect(() => {
    if (isEdit) {
      apiFetch(`/services/${id}`)
        .then(res => res.json())
        .then(result => {
          if (result.success) {
            const d = result.data;
            setForm({
              title:       d.title || '',
              description: d.description || '',
            });
          }
        })
        .catch(() => setError('Could not load the service.'));
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

    try {
      const response = await apiFetch(
        isEdit ? `/services/${id}` : '/services',
        {
          method: isEdit ? 'PUT' : 'POST',
          body: JSON.stringify(payload),
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
            <textarea name="description" value={form.description} onChange={handleChange} required />
          </div>

          <button type="submit" className="btn" data-cy="save-service" disabled={loading}>
            {loading ? 'Saving...' : (isEdit ? 'Update Service' : 'Add Service')}
          </button>
        </form>
      </div>
    </main>
  );
}
