import React from 'react';
import { Route, Routes } from 'react-router-dom';

// Page components
import Home       from './components/Home';
import About      from './src/about';
import Projects   from './src/project';
import Services   from './src/services';
import References from './src/references';
import Contact    from './src/contact';

// Admin components
import Dashboard      from './src/admin/Dashboard';
import ProjectsList   from './src/admin/ProjectsList';
import ProjectForm    from './src/admin/ProjectForm';
import ServicesList   from './src/admin/ServicesList';
import ServiceForm    from './src/admin/ServiceForm';
import ReferencesList from './src/admin/ReferencesList';
import ReferenceForm  from './src/admin/ReferenceForm';
import UsersList      from './src/admin/UsersList';
import UserForm       from './src/admin/UserForm';

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
        {/* Public pages */}
        <Route path="/"           element={<Home />}       />
        <Route path="/about"      element={<About />}      />
        <Route path="/projects"   element={<Projects />}   />
        <Route path="/services"   element={<Services />}   />
        <Route path="/references" element={<References />} />
        <Route path="/contact"    element={<Contact />}    />

        {/* Admin dashboard */}
        <Route path="/admin" element={<Dashboard />} />

        {/* Admin projects */}
        <Route path="/admin/projects"            element={<ProjectsList />}   />
        <Route path="/admin/projects/new"        element={<ProjectForm />}    />
        <Route path="/admin/projects/edit/:id"   element={<ProjectForm />}    />

        {/* Admin services */}
        <Route path="/admin/services"            element={<ServicesList />}   />
        <Route path="/admin/services/new"        element={<ServiceForm />}    />
        <Route path="/admin/services/edit/:id"   element={<ServiceForm />}    />

        {/* Admin references */}
        <Route path="/admin/references"          element={<ReferencesList />} />
        <Route path="/admin/references/new"      element={<ReferenceForm />}  />
        <Route path="/admin/references/edit/:id" element={<ReferenceForm />}  />

        {/* Admin users */}
        <Route path="/admin/users"               element={<UsersList />}      />
        <Route path="/admin/users/new"           element={<UserForm />}       />
        <Route path="/admin/users/edit/:id"      element={<UserForm />}       />
      </Routes>
    </div>
  );
};

export default MainRouter;
