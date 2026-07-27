import React from 'react';
import { Link } from 'react-router-dom';

//Dashboard the admin hub. Links to all management pages.
export default function Dashboard() {
  const sections = [
    { to: '/admin/projects',   label: 'Projects',   desc: 'Add, edit, or remove projects.' },
    { to: '/admin/services',   label: 'Services',   desc: 'Manage the services you offer.' },
    { to: '/admin/references', label: 'References', desc: 'Manage testimonials and references.' },
    { to: '/admin/users',      label: 'Users',      desc: 'Manage user accounts.' },
  ];

  return (
    <main className="section">
      <div className="container">
        <h1 className="page-title">Admin Dashboard</h1>
        <p className="page-subtitle">Manage your portfolio content.</p>

        <div className="grid-3">
          {sections.map(({ to, label, desc }) => (
            <Link key={to} to={to} className="card" style={{ textDecoration: 'none' }}>
              <h3 style={{ color: 'var(--white)', marginBottom: '0.5rem' }}>{label}</h3>
              <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>{desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}