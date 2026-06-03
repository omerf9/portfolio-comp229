import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Layout.css';

/**
 * Layout
 * Persistent navigation bar that appears on every page.
 * Includes my initials and links to all 6 pages.
 * Highlights the active page and collapses into a hamburger menu on mobile.
 */
export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Nav links config easy to update
  const navLinks = [
    { to: '/',           label: 'Home'       },
    { to: '/about',      label: 'About'      },
    { to: '/projects',   label: 'Projects'   },
    { to: '/services',   label: 'Services'   },
    { to: '/references', label: 'References' },
    { to: '/contact',    label: 'Contact'    },
  ];

  return (
    <header className="navbar">
      <div className="navbar__inner container">

        {/* Custom Logo: hexagon with my initials*/}
        <Link to="/" className="navbar__logo" aria-label="Home">
          <svg className="logo-hex" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
            <polygon
              points="30,2 56,16 56,44 30,58 4,44 4,16"
              fill="var(--accent)"
              stroke="none"
            />
            <text x="50%" y="54%" dominantBaseline="middle" textAnchor="middle"
              fontSize="18" fontWeight="800" fontFamily="Space Grotesk, sans-serif" fill="var(--white)">
              OY
            </text>
          </svg>
          <span className="logo-name">Omer<span className="logo-accent">.</span></span>
        </Link>

        {/*Desktop nav links*/}
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
