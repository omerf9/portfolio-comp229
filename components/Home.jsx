import React from 'react';
import { Link } from 'react-router-dom';
import '../src/index.css';
import './Home.css';
import meImg from '../src/assets/me.png';

/**
 * Home Page*/
export default function Home() {
  return (
    <main className="home">
      <div className="container">

        {/* Hero Section */}
        <section className="hero">

          {/* Left side intro text */}
          <div className="hero__text">
            <h1 className="hero__title">
              Hi, I'm Omer Yousif
            </h1>

            <p className="hero__intro">
              I'm a software engineering student at Centennial College. I'm learning to build web applications and exploring the AI world. This portfolio is where I share my projects, skills, and journey in tech. Feel free to explore and connect!
            </p>

            {/* CTA buttons linking to About and Projects pages */}
            <div className="hero__actions">
              <Link to="/about" className="btn">About Me</Link>
              <Link to="/projects" className="btn btn-outline">View Projects</Link>
            </div>
          </div>

          {/* Right side photo */}
          <div className="hero__photo">
            <img src={meImg} alt="Omer Yousif" />
          </div>

        </section>

        {/*  Nav shortcuts  */}
        <section className="home-nav-grid">
          <h2 className="section-mini-title">Explore the Site</h2>
          <div className="grid-3">
            {[
              { to: '/projects',   emoji: '🛠', title: 'Projects',   desc: "Work I've built and shipped." },
              { to: '/services',   emoji: '⚙️', title: 'Services',   desc: "What I can do for you." },
              { to: '/contact',    emoji: '✉️', title: 'Contact',    desc: "Let's work together." },
            ].map(({ to, emoji, title, desc }) => (
              <Link key={to} to={to} className="home-nav-card card">
                <span className="home-nav-emoji">{emoji}</span>
                <h3>{title}</h3>
                <p>{desc}</p>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
