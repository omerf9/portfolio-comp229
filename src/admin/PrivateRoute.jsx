import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../api/auth';


//PrivateRoute wraps a component so it can only be viewed when signed in.
//If there is no token, the user is redirected to the sign in page.
//Usage in MainRouter:
//<Route path="/admin" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
export default function PrivateRoute({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/signin" replace />;
  }
  return children;
}