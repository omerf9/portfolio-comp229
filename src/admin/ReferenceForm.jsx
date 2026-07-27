import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL } from '../api/config';

/**
 * ReferenceForm — handles BOTH adding a new reference and editing an existing one.
 * If there's an :id in the URL, it's edit mode. Otherwise, it's add mode.
 */
export default function ReferenceForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    name: '',
    position: '',
    company: '',
    testimonial: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // If editing, fetch the existing reference and fill the form
  useEffect(() => {
    if (isEdit) {
      fetch(`${API_URL}/references/${id}`)
        .then(res => res.json())
        .then(result => {
          if (result.success) {
            const r = result.data;
            setForm({
              name:        r.name || '',
              position:    r.position || '',
              company:     r.company || '',
              testimonial: r.testimonial || '',
            });
          }
        })
        .catch(() => setError('Could not load the reference.'));
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
        isEdit ? `${API_URL}/references/${id}` : `${API_URL}/references`,
        {
          method: isEdit ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        }
      );

      const result = await response.json();

      if (result.success) {
        navigate('/admin/references');
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
        <h1 className="page-title">{isEdit ? 'Edit Reference' : 'Add Reference'}</h1>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input name="name" value={form.name} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Position</label>
            <input name="position" value={form.position} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Company</label>
            <input name="company" value={form.company} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Testimonial</label>
            <textarea
              name="testimonial"
              value={form.testimonial}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn" disabled={loading}>
            {loading ? 'Saving...' : (isEdit ? 'Update Reference' : 'Add Reference')}
          </button>
        </form>
      </div>
    </main>
  );
}
