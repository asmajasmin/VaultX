import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Welcome from './pages/Welcome';
import FeaturesPage from './pages/FeaturesPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ContactPage from './pages/ContactPage';
import Dashboard from './pages/Dashboard'; 

const App = () => {
  // --- STATE MANAGEMENT ---
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [user, setUser] = useState({ name: 'User', tier: 'Free' });

  // Theme Toggle Effect
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  // Private Route Wrapper
  const PrivateRoute = ({ children }) => {
    return isLoggedIn ? children : <Navigate to="/login" />;
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* --- Public Routes --- */}
        <Route path="/" element={
          <Welcome 
            onLogin={() => {}} 
            isDarkMode={isDarkMode} 
            toggleTheme={toggleTheme} 
          />
        } />
        
        <Route path="/features" element={
          <FeaturesPage 
            isDarkMode={isDarkMode} 
            toggleTheme={toggleTheme} 
          />
        } />

        <Route path="/login" element={
          <LoginPage 
            onLoginSuccess={handleLoginSuccess} 
            isDarkMode={isDarkMode} 
            toggleTheme={toggleTheme} 
          />
        } />

        <Route path="/register" element={
          <RegisterPage 
            onRegisterSuccess={handleLoginSuccess} 
            isDarkMode={isDarkMode} 
            toggleTheme={toggleTheme} 
          />
        } />

        <Route path="/contact" element={
          <ContactPage 
            isDarkMode={isDarkMode} 
            toggleTheme={toggleTheme} 
          />
        } />

        {/* --- Protected Dashboard Routes --- */}
        <Route 
          path="/dashboard/*" 
          element={
            <PrivateRoute>
              <Dashboard 
                user={user} 
                onLogout={() => setIsLoggedIn(false)}
              />
            </PrivateRoute>
          } 
        />

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;