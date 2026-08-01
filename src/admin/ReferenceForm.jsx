import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiFetch } from '../api/auth';

//ReferenceForm handles BOTH adding a new reference and editing an existing one.
//Requests go through apiFetch so the Authorization token is sent with them.
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

  useEffect(() => {
    if (isEdit) {
      apiFetch(`/references/${id}`)
        .then(res => res.json())
        .then(result => {
          if (result.success) {
            const d = result.data;
            setForm({
              name:        d.name || '',
              position:    d.position || '',
              company:     d.company || '',
              testimonial: d.testimonial || '',
            });
          }
        })
        .catch(() => setError('Could not load the reference.'));
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
        isEdit ? `/references/${id}` : '/references',
        {
          method: isEdit ? 'PUT' : 'POST',
          body: JSON.stringify(payload),
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
            <textarea name="testimonial" value={form.testimonial} onChange={handleChange} required />
          </div>

          <button type="submit" className="btn" data-cy="save-reference" disabled={loading}>
            {loading ? 'Saving...' : (isEdit ? 'Update Reference' : 'Add Reference')}
          </button>
        </form>
      </div>
    </main>
  );
}
