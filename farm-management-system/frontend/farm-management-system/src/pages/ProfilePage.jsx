import React from 'react';
import '../App.css';

function ProfilePage() {
  return (
    <div className="profile-page">
      <h1>Profile</h1>
      <div className="profile-picture">
        <img src="/path/to/profile-picture.jpg" alt="Profile" className="profile-img" />
      </div>
      <div className="profile-details">
        <p><strong>Username:</strong> JohnDoe</p>
        <p><strong>Email:</strong> johndoe@example.com</p>
        <p><strong>Role:</strong> Farmer</p>
      </div>
      <button className="edit-profile-button">Edit Profile</button>
    </div>
  );
}

export default ProfilePage;