import React from 'react';
import { Route, Routes } from 'react-router-dom';

// Public page components
import Home       from './components/Home';
import About      from './src/about';
import Projects   from './src/project';
import Services   from './src/services';
import References from './src/references';
import Contact    from './src/contact';

// Auth components
import Signin       from './src/admin/Signin';
import Signup       from './src/admin/Signup';
import PrivateRoute from './src/admin/PrivateRoute';

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

// Shared layout (navbar and logo)
import Layout from './components/Layout';

//MainRouter
//Defines all client side routes.
//Admin routes are wrapped in PrivateRoute so they require authentication.

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

        {/* Auth pages */}
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected admin dashboard */}
        <Route path="/admin" element={<PrivateRoute><Dashboard /></PrivateRoute>} />

        {/* Protected admin projects */}
        <Route path="/admin/projects"            element={<PrivateRoute><ProjectsList /></PrivateRoute>} />
        <Route path="/admin/projects/new"        element={<PrivateRoute><ProjectForm /></PrivateRoute>} />
        <Route path="/admin/projects/edit/:id"   element={<PrivateRoute><ProjectForm /></PrivateRoute>} />

        {/* Protected admin services */}
        <Route path="/admin/services"            element={<PrivateRoute><ServicesList /></PrivateRoute>} />
        <Route path="/admin/services/new"        element={<PrivateRoute><ServiceForm /></PrivateRoute>} />
        <Route path="/admin/services/edit/:id"   element={<PrivateRoute><ServiceForm /></PrivateRoute>} />

        {/* Protected admin references */}
        <Route path="/admin/references"          element={<PrivateRoute><ReferencesList /></PrivateRoute>} />
        <Route path="/admin/references/new"      element={<PrivateRoute><ReferenceForm /></PrivateRoute>} />
        <Route path="/admin/references/edit/:id" element={<PrivateRoute><ReferenceForm /></PrivateRoute>} />

        {/* Protected admin users */}
        <Route path="/admin/users"               element={<PrivateRoute><UsersList /></PrivateRoute>} />
        <Route path="/admin/users/new"           element={<PrivateRoute><UserForm /></PrivateRoute>} />
        <Route path="/admin/users/edit/:id"      element={<PrivateRoute><UserForm /></PrivateRoute>} />
      </Routes>
    </div>
  );
};

export default MainRouter;
