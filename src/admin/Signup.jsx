import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { API_URL } from '../api/config';


//Signup creates a new user account through the backend.
//After a successful signup the user is sent to the sign in page.
 
export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (result.success) {
        navigate('/signin');
      } else {
        setError(result.message || 'Sign up failed.');
      }
    } catch (err) {
      setError('Could not connect to the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="section">
      <div className="container" style={{ maxWidth: '420px' }}>
        <div className="accent-line" />
        <h1 className="page-title">Sign Up</h1>
        <p className="page-subtitle">Create an account to manage the portfolio.</p>

        {error && <p style={{ color: 'red' }} data-cy="signup-error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>First Name</label>
            <input
              name="firstname"
              value={form.firstname}
              onChange={handleChange}
              data-cy="signup-firstname"
              required
            />
          </div>

          <div className="form-group">
            <label>Last Name</label>
            <input
              name="lastname"
              value={form.lastname}
              onChange={handleChange}
              data-cy="signup-lastname"
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              data-cy="signup-email"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              data-cy="signup-password"
              required
            />
          </div>

          <button type="submit" className="btn" data-cy="signup-submit" disabled={loading}>
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <p style={{ marginTop: '1.5rem', color: 'var(--muted)', fontSize: '0.9rem' }}>
          Already have an account? <Link to="/signin">Sign in</Link>
        </p>
      </div>
    </main>
  );
}
