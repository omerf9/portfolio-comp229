import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MainRouter from '../MainRouter';

// Root component — wraps the entire app in the Router context
const App = () => {
  return (
    <Router>
      <MainRouter />
    </Router>
  );
};

export default App;
