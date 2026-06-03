import React from 'react';
import { Route, Routes } from 'react-router-dom';

// Page components
import Home       from './components/Home';
import About      from './src/about';
import Projects   from './src/project';
import Services   from './src/services';
import References from './src/references';
import Contact    from './src/contact';

// Shared layout (navbar + logo)
import Layout from './components/Layout';

/**
 * MainRouter
 * Defines all client-side routes for the portfolio.
 * The Layout component (navbar) renders on every page above the route content.
 */
const MainRouter = () => {
  return (
    <div>
      <Layout />
      <Routes>
        <Route path="/"           element={<Home />}       />
        <Route path="/about"      element={<About />}      />
        <Route path="/projects"   element={<Projects />}   />
        <Route path="/services"   element={<Services />}   />
        <Route path="/references" element={<References />} />
        <Route path="/contact"    element={<Contact />}    />
      </Routes>
    </div>
  );
};

export default MainRouter;
