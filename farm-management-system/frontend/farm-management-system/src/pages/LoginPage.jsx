import React, { useState } from 'react';
import { login } from '../api/auth';
import { useAuth } from '../hooks/useAuthHook';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const { login: setAuthToken } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(credentials);
      setAuthToken(response.access);
      localStorage.setItem('authToken', response.access);
      navigate('/dashboard');
    } catch {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="login-page">
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <button type="submit" className="form-button">Login</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      <p className="redirect-message">
        Don’t have an account? <a href="/signup" className="redirect-link">Sign up</a>
      </p>
    </div>
  );
}

export default LoginPage;