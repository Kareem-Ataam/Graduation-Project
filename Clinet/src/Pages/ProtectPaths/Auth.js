// AuthContext.js
import React, { createContext, useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [userType, setUserType] = useState(localStorage.getItem('user type') || null);

  const login = () => {
    // Implement login logic (e.g., authenticate user)
    setIsLoggedIn(true);
    setUserType(localStorage.getItem('user type'));
  };

  const logout = () => {
    // Implement logout logic
    localStorage.removeItem('token');
    localStorage.removeItem('user type');
    setIsLoggedIn(false);
    setUserType(null);
    return <Navigate to="/login" />;
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userType, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
