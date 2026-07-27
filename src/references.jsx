import React, { useState, useEffect } from 'react';
import '../src/index.css';
import './references.css';
import { API_URL } from './api/config';

/**
 * References public page.
 * Fetches all references from the backend API instead of hardcoded data.
 * Each reference shows name, position, company, and testimonial.
 */
export default function References() {
  const [references, setReferences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`${API_URL}/references`)
      .then(res => res.json())
      .then(result => {
        if (result.success) {
          setReferences(result.data);
        } else {
          setError('Could not load references.');
        }
      })
      .catch(() => setError('Could not connect to the server.'))
      .finally(() => setLoading(false));
  }, []);

  // Build initials from a name, e.g. "Jane Smith" -> "JS"
  const getInitials = (name) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <main className="section">
      <div className="container">

        <div className="accent-line" />
        <h1 className="page-title">References</h1>
        <p className="page-subtitle">
          People who can speak to my work.
        </p>

        {loading && <p>Loading references...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {!loading && !error && references.length === 0 && <p>No references to show yet.</p>}

        <div className="references-list">
          {references.map((ref) => (
            <blockquote key={ref.id} className="ref-card card">

              <span className="ref-quote-mark">&ldquo;</span>

              <p className="ref-testimonial">{ref.testimonial}</p>

              <div className="ref-person">
                <div className="ref-avatar">{getInitials(ref.name)}</div>
                <div>
                  <p className="ref-name">{ref.name}</p>
                  <p className="ref-role">{ref.position} — {ref.company}</p>
                </div>
              </div>

            </blockquote>
          ))}
        </div>

      </div>
    </main>
  );
}
