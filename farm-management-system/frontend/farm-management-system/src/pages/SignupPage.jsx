import React, { useState } from 'react';
import { signup } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import '../App.css'; // Ensure App.css is imported

function SignupPage() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(formData);
      setMessage('Signup successful! You can now log in.');
      setTimeout(() => navigate('/login'), 2000); // Redirect to login page after 2 seconds
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || 'Signup failed. Please try again.');
    }
  };

  return (
    <div className="signup-page">
      <h1>Signup</h1>
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
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
            value={formData.password}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <button type="submit" className="form-button">Signup</button>
      </form>
      {message && <p className={message.includes('successful') ? 'success-message' : 'error-message'}>{message}</p>}
      <p className="redirect-message">
        Already have an account? <a href="/login" className="redirect-link">Login</a>
      </p>
    </div>
  );
}

export default SignupPage;