import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuthHook';

function ProtectedRoute({ children }) {
  const { token } = useAuth();

  console.log('ProtectedRoute: token is', token);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;