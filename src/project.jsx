import React, { useState, useEffect } from 'react';
import '../src/index.css';
import './project.css';
import { API_URL } from './api/config';

/**
 * Projects public page.
 * Fetches all projects from the backend API instead of hardcoded data.
 */
export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
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
  }, []);

  return (
    <main className="section">
      <div className="container">

        <div className="accent-line" />
        <h1 className="page-title">Projects</h1>
        <p className="page-subtitle">
          A selection of things I've built. More on the way.
        </p>

        {loading && <p>Loading projects...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {!loading && !error && projects.length === 0 && <p>No projects to show yet.</p>}

        <div className="projects-list">
          {projects.map((project) => (
            <article key={project.id} className="project-card card">

              <div className="project-img">
                {project.image ? (
                  <img src={project.image} alt={project.title} />
                ) : (
                  <div
                    style={{
                      width: '100%',
                      height: '180px',
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'var(--font-head)',
                      fontSize: '2.5rem',
                      fontWeight: 800,
                      color: 'var(--accent)',
                    }}
                  >
                    {project.title ? project.title.charAt(0) : '?'}
                  </div>
                )}
              </div>

              <div className="project-info">
                <div className="project-meta">
                  <span className="project-date">
                    {project.completion
                      ? new Date(project.completion).toLocaleDateString('en-CA', {
                          year: 'numeric',
                          month: 'long',
                        })
                      : ''}
                  </span>
                </div>

                <h2 className="project-title">{project.title}</h2>
                <p className="project-desc">{project.description}</p>
              </div>
            </article>
          ))}
        </div>

      </div>
    </main>
  );
}
