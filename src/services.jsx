import React from 'react';
import '../src/index.css';
import './services.css';

/**
 * Services
 */
export default function Services() {

  // Services data
  const services = [
    {
      icon: '🌐',
      title: 'Web App Development',
      description:
        'Full stack web applications built with React on the front end and Python (FastAPI) on the back end. From the first idea to a deployed, working product.',
    },
    {
      icon: '🤖',
      title: 'AI Integration',
      description:
        'Adding AI features to apps using the OpenAI and Claude APIs things like chatbots, document Q&A, content analysis, and summarization. I have deployed several projects like this.',
    },
    {
      icon: '🛠',
      title: 'API Development',
      description:
        'Building REST APIs that are organized, documented, and ready to connect to a frontend or another service.',
    },
    {
      icon: '🗄️',
      title: 'Database Setup',
      description:
        'Designing and setting up databases with PostgreSQL and Supabase, including the schema and the connection to your app.',
    },
    {
      icon: '⚙️',
      title: 'Workflow Automation',
      description:
        'Automating repetitive tasks and connecting tools together using Python and platforms like n8n, so manual work gets handled in the background.',
    },
    {
      icon: '🚀',
      title: 'Deployment',
      description:
        'Getting projects live on platforms like Vercel and Render, so your app is actually online and usable, not just running on a laptop.',
    },
  ];

  return (
    <main className="section">
      <div className="container">

        {/* Page header*/}
        <div className="accent-line" />
        <h1 className="page-title">Services</h1>
        <p className="page-subtitle">
          What I can help you build, fix, or automate.
        </p>

        {/*Service cards grid*/}
        <div className="grid-3">
          {services.map((service) => (
            <div key={service.title} className="service-card card">
              <span className="service-icon">{service.icon}</span>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-desc">{service.description}</p>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}
