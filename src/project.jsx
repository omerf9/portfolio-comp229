import React from 'react';
import '../src/index.css';
import './project.css';
import agentbaseImg from './assets/agentbase.png';
import codeatlasImg from './assets/codeatlas.png';
import hooklabImg from './assets/hooklab.png';

/**
 * Projects
 */
export default function Projects() {

  // Project data 
 const projects = [
    {
      id: 1,
      title: 'AgentBase',
      description:
        'An AI agent platform serving 5 industries with automated lead qualification and scoring. Built with a FastAPI backend and React frontend, using n8n for automation workflows and Supabase for data management.',
      role: 'Solo developer built the full stack, from the API to the React frontend, and deployed it on Vercel.',
      tech: ['Python', 'FastAPI', 'React', 'OpenAI', 'Supabase', 'n8n'],
      date: '2025',
      link: 'https://agentbase-cyan.vercel.app',
      image: agentbaseImg,
    },
    {
      id: 2,
      title: 'CodeAtlas',
      description:
        'An AI powered tool that analyzes any GitHub repository I think of it as "Google Maps for codebases." It detects the tech stack, maps the architecture, and answers questions about the code using GPT-4o in an IDE style layout.',
      role: 'Solo developer built the GitHub repo analyzer, the GPT-4o Q&A feature, and the 3 panel interface.',
      tech: ['Python', 'FastAPI', 'React', 'GitHub API', 'GPT-4o'],
      date: '2025',
      link: 'https://codeatlas-ten.vercel.app',
      image: codeatlasImg,
    },
    {
      id: 3,
      title: 'HookLab Studio',
      description:
        'An AI tool that analyzes ad creatives it scores hooks, retention, and calls-to-action using GPT-4o Vision, and transcribes audio with Whisper for multi modal content analysis.',
      role: 'Solo developer built the analysis engine and integrated GPT-4o Vision and Whisper.',
      tech: ['Python', 'FastAPI', 'React', 'GPT-4o Vision', 'Whisper'],
      date: '2025',
      link: 'https://hooklab-alpha.vercel.app',
      image: hooklabImg,
    },
  ];

  return (
    <main className="section">
      <div className="container">

        {/* Page header*/}
        <div className="accent-line" />
        <h1 className="page-title">Projects</h1>
        <p className="page-subtitle">
          A selection of things I've built. More on the way.
        </p>

        {/*Project cards */}
        <div className="projects-list">
          {projects.map((project) => (
            <article key={project.id} className="project-card card">

              <div className="project-img">
                <img src={project.image} alt={project.title} />
              </div>

              <div className="project-info">
                <div className="project-meta">
                  <span className="project-date">{project.date}</span>
                </div>

                <h2 className="project-title">{project.title}</h2>
                <p className="project-desc">{project.description}</p>
                <p className="project-role"><strong>My Role:</strong> {project.role}</p>

                {/* Tech stack tags */}
                <div className="project-tech">
                  {project.tech.map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  View Live Site →
                </a>
              </div>
            </article>
          ))}
        </div>

      </div>
    </main>
  );
}
