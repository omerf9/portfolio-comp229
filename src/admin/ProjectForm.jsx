import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiFetch } from '../api/auth';

//ProjectForm handles BOTH adding a new project and editing an existing one.
//Requests go through apiFetch so the Authorization token is sent with them.
export default function ProjectForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    title: '',
    completion: '',
    description: '',
    image: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEdit) {
      apiFetch(`/projects/${id}`)
        .then(res => res.json())
        .then(result => {
          if (result.success) {
            const d = result.data;
            setForm({
              title:       d.title || '',
              completion:  d.completion ? d.completion.substring(0, 10) : '',
              description: d.description || '',
              image:       d.image || '',
            });
          }
        })
        .catch(() => setError('Could not load the project.'));
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
        isEdit ? `/projects/${id}` : '/projects',
        {
          method: isEdit ? 'PUT' : 'POST',
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();

      if (result.success) {
        navigate('/admin/projects');
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
            <input name="title" value={form.title} onChange={handleChange} data-cy="project-title" required />
          </div>

          <div className="form-group">
            <label>Completion Date</label>
            <input type="date" name="completion" value={form.completion} onChange={handleChange} data-cy="project-completion" />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} data-cy="project-description" required />
          </div>

          <div className="form-group">
            <label>Image URL</label>
            <input name="image" value={form.image} onChange={handleChange} data-cy="project-image" />
          </div>

          <button type="submit" className="btn" data-cy="save-project" disabled={loading}>
            {loading ? 'Saving...' : (isEdit ? 'Update Project' : 'Add Project')}
          </button>
        </form>
      </div>
    </main>
  );
}
