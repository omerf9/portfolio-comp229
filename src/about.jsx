import React from 'react';
import { Link } from 'react-router-dom';
import '../src/index.css';
import './about.css';
import myImg from './assets/me.png';

/**
 * About
 * Personal info page including name, profile photo,
 * bio  skills, and a link to resume PDF.
 */
export default function About() {

  // Skills displayed as tag chips
  const skills = [
    'Python', 'JavaScript', 'TypeScript', 'C#', 'React', 'vite', 'HTML/CSS',
    'FastAPI', 'node.js', 'PostgreSQL', 'REST APIs', 'OpenAI API', 'Claude API',
    'Git/GitHub',
  ];

  return (
    <main className="section">
      <div className="container">

        {/*Page header*/}
        <div className="accent-line" />
        <h1 className="page-title">About Me</h1>
        <p className="page-subtitle">
          Get to know who I am, what I do, and where I'm headed.
        </p>

        <div className="about-grid">

          {/* Profile photo*/}
          <div className="about-photo-col">
            <div className="about-photo">

                <img src={myImg} alt="Omer Yousif" />
      
            </div>

            {/* Resume download link — replace href with your actual PDF path */}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
              style={{ width: '100%', textAlign: 'center', marginTop: '1.25rem' }}
            >
              📄 Download Resume
            </a>
          </div>

          {/*Bio and skills*/}
          <div className="about-content">
            <h2 className="about-name">Omer Yousif</h2>
            <p className="about-bio">
              I'm a Software Engineering Artificial Intelligence student at Centennial College
              in Toronto, working toward my Advanced Diploma (graduating December 2027).
              Most of my time goes into learning how to build full web applications from the frontend in
              React to backend APIs and databases.
            </p>
            <p className="about-bio">
              Outside of class I build my own projects to put what I'm learning into practice.
              I'm still growing as a developer, but I care about writing clean code and finishing and shipping the things I start.
            </p>

            {/* Skills section */}
            <div className="about-skills">
              <h3 className="about-skills-title">Skills</h3>
              <div className="about-skills-list">
                {skills.map((skill) => (
                  <span key={skill} className="tag">{skill}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/*CTA*/}
        <div style={{ marginTop: '3rem' }}>
          <Link to="/contact" className="btn">Get In Touch</Link>
        </div>
      </div>
    </main>
  );
}
