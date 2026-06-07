import React from 'react';
import '../src/index.css';
import './references.css';
import { Link } from 'react-router-dom';

/**
 * References
 */
export default function References() {
  return (
    <main className="section">
      <div className="container">

        {/* Page header */}
        <div className="accent-line" />
        <h1 className="page-title">References</h1>
        <p className="page-subtitle">
          People who can speak to my work.
        </p>

        {/* References available on request */}
        <div className="references-content">
          <p className="references-text">
            Professional and academic references are available on request.
          </p>
          <p className="references-text">
            I'm happy to connect you with instructors and people I've worked
            with who can speak to my work and how I approach building things.
            Just reach out through the contact page and I'll share their details.
          </p>
          <Link to="/contact" className="btn">Request References</Link>
        </div>

      </div>
    </main>
  );
}