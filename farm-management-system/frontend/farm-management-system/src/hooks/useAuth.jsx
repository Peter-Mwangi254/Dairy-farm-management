import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('authToken'));
  console.log('AuthProvider initialized with token:', token);
  const navigate = useNavigate();

  const login = (newToken) => {
    console.log('Login called with token:', newToken);
    setToken(newToken);
    localStorage.setItem('authToken', newToken);
    navigate('/milk-sales-dashboard');
  };

  const logout = () => {
    console.log('Logout called');
    setToken(null);
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;