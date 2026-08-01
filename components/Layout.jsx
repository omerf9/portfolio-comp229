import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './Layout.css';
import { isAuthenticated, signout } from '../src/api/auth';

//Layout
//Persistent navigation bar that appears on every page.
//The Admin link and Sign Out button only appear when the user is signed in.
export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const loggedIn = isAuthenticated();

  // Public nav links always visible
  const navLinks = [
    { to: '/',           label: 'Home'       },
    { to: '/about',      label: 'About'      },
    { to: '/projects',   label: 'Projects'   },
    { to: '/services',   label: 'Services'   },
    { to: '/references', label: 'References' },
    { to: '/contact',    label: 'Contact'    },
  ];

  const handleSignout = () => {
    signout();
    setMenuOpen(false);
    navigate('/signin');
  };

  return (
    <header className="navbar">
      <div className="navbar__inner container">

        {/* Custom Logo hexagon */}
        <Link to="/" className="navbar__logo" aria-label="Home">
          <svg className="logo-hex" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
            <polygon
              points="30,2 56,16 56,44 30,58 4,44 4,16"
              fill="var(--accent)"
              stroke="none"
            />
            <text x="50%" y="54%" dominantBaseline="middle" textAnchor="middle"
              fontSize="18" fontWeight="800" fontFamily="Space Grotesk, sans-serif" fill="#fff">
              OY
            </text>
          </svg>
          <span className="logo-name">Omer<span className="logo-accent">.</span></span>
        </Link>

        {/* Nav links */}
        <nav className={`navbar__nav ${menuOpen ? 'navbar__nav--open' : ''}`}>
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `navbar__link ${isActive ? 'navbar__link--active' : ''}`
              }
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </NavLink>
          ))}

          {/* Admin link only when signed in */}
          {loggedIn && (
            <NavLink
              to="/admin"
              data-cy="nav-admin"
              className={({ isActive }) =>
                `navbar__link ${isActive ? 'navbar__link--active' : ''}`
              }
              onClick={() => setMenuOpen(false)}
            >
              Admin
            </NavLink>
          )}

          {/* Sign in / Sign out */}
          {loggedIn ? (
            <button
              onClick={handleSignout}
              className="navbar__link"
              data-cy="signout"
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              Sign Out
            </button>
          ) : (
            <NavLink
              to="/signin"
              data-cy="nav-signin"
              className={({ isActive }) =>
                `navbar__link ${isActive ? 'navbar__link--active' : ''}`
              }
              onClick={() => setMenuOpen(false)}
            >
              Sign In
            </NavLink>
          )}
        </nav>

        {/* mobile menu button */}
        <button
          className={`navbar__hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}