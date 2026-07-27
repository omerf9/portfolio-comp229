import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL } from '../api/config';

// ProjectForm handles both adding a new project and editing an existing one.
 // If there's an :id in the URL, it's edit mode. Otherwise, it's add mode.

export default function ProjectForm() {
  const navigate = useNavigate();
  const { id } = useParams(); // if editing, the URL has an id; if adding, it's undefined
  const isEdit = Boolean(id);

  // Form state one object holding all fields
  const [form, setForm] = useState({
    title: '',
    completion: '',
    description: '',
    image: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  //If editing, fetch the existing project and fill the form
  useEffect(() => {
    if (isEdit) {
      fetch(`${API_URL}/projects/${id}`)
        .then(res => res.json())
        .then(result => {
          if (result.success) {
            const p = result.data;
            setForm({
              title:       p.title || '',
              completion:  p.completion ? p.completion.substring(0, 10) : '',
              description: p.description || '',
              image:       p.image || '',
            });
          }
        })
        .catch(() => setError('Could not load the project.'));
    }
  }, [id, isEdit]);

  //Update state when any field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  //Submit: POST for add, PUT for edit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        isEdit ? `${API_URL}/projects/${id}` : `${API_URL}/projects`,
        {
          method: isEdit ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        }
      );

      const result = await response.json();

      if (result.success) {
        navigate('/admin/projects'); // go back to the list
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
        <h1 className="page-title">{isEdit ? 'Edit Project' : 'Add Project'}</h1>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input name="title" value={form.title} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Completion Date</label>
            <input type="date" name="completion" value={form.completion} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Image URL</label>
            <input name="image" value={form.image} onChange={handleChange} />
          </div>

          <button type="submit" className="btn" disabled={loading}>
            {loading ? 'Saving...' : (isEdit ? 'Update Project' : 'Add Project')}
          </button>
        </form>
      </div>
    </main>
  );
}