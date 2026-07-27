import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../api/config';

 // ProjectsList fetches all projects from the backend and displays them with Edit and Delete buttons.
 // Also a button to add a new project.
export default function ProjectsList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch all projects when the page loads
  const loadProjects = () => {
    setLoading(true);
    fetch(`${API_URL}/projects`)
      .then(res => res.json())
      .then(result => {
        if (result.success) {
          setProjects(result.data);
        } else {
          setError('Could not load projects.');
        }
      })
      .catch(() => setError('Could not connect to the server.'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadProjects();
  }, []);

  // Delete a project by id
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;

    try {
      const response = await fetch(`${API_URL}/projects/${id}`, {
        method: 'DELETE',
      });
      const result = await response.json();

      if (result.success) {
        // Remove it from the list without refetching everything
        setProjects(prev => prev.filter(p => p.id !== id));
      } else {
        alert('Could not delete the project.');
      }
    } catch (err) {
      alert('Could not connect to the server.');
    }
  };

  return (
    <main className="section">
      <div className="container">
        <h1 className="page-title">Manage Projects</h1>

        <Link to="/admin/projects/new" className="btn" style={{ marginBottom: '1.5rem', display: 'inline-block' }}>
          + Add Project
        </Link>

        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {!loading && projects.length === 0 && <p>No projects yet. Add one above.</p>}

        <div className="admin-list">
          {projects.map((project) => (
            <div key={project.id} className="admin-list-item card">
              <div>
                <h3>{project.title}</h3>
                <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>
                  {project.description}
                </p>
              </div>
              <div className="admin-actions">
                <Link to={`/admin/projects/edit/${project.id}`} className="btn btn-outline">
                  Edit
                </Link>
                <button onClick={() => handleDelete(project.id)} className="btn" style={{ background: '#dc2626' }}>
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