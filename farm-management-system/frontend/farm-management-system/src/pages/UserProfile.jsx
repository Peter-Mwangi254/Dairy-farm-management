import React, { useState, useEffect } from 'react';
import API from '../api/api';
import './UserProfile.css';

function UserProfile() {
  const [user, setUser] = useState({ name: '', email: '' });
  const [message, setMessage] = useState(null);

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const response = await API.get('auth/profile/');
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    }

    fetchUserProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      await API.put('auth/profile/', user);
      setMessage('Profile updated successfully!');
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('Failed to update profile. Please try again.');
    }
  };

  return (
    <div className="user-profile">
      <h1>User Profile</h1>
      {message && <p className={message.includes('Error') ? 'error-message' : 'success-message'}>{message}</p>}
      <form onSubmit={handleUpdateProfile} className="profile-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={user.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">Update Profile</button>
      </form>
    </div>
  );
}

export default UserProfile;