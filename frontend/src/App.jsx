import React, { useState, useEffect } from 'react';

import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Dashboard } from "./pages/Dashboard";

const App = () => {
  const [currentPage, setCurrentPage] = useState('signin');

  return (
    <div>
      {currentPage === 'signin' && (
        <Signin
          onSuccess={() => setCurrentPage('dashboard')}
          onSwitchToSignup={() => setCurrentPage('signup')}
        />
      )}
      {currentPage === 'signup' && (
        <Signup
          onSuccess={() => setCurrentPage('dashboard')}
          onSwitchToSignin={() => setCurrentPage('signin')}
        />
      )}
      {currentPage === 'dashboard' && <Dashboard />}
    </div>
  );
};

export default App;

