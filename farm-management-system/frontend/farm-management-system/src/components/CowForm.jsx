import { useState } from 'react';
import API from '../api/api';
import '../App.css';

export default function CowForm({ onSuccess }) {
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [dob, setDob] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await API.post('cows/', { name, breed, date_of_birth: dob });
      setName(''); setBreed(''); setDob('');
      onSuccess?.();
    } catch (err) {
      console.error(err);
      alert('Error adding cow');
    }
  }

  return (
    <div className="form-container">
      <h2 className="form-title">🐄 Add New Cow</h2>
      <form onSubmit={handleSubmit} className="form">
        {/* Name Field */}
        <div className="form-group">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Enter cow’s name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="form-input"
            required
          />
        </div>

        {/* Breed Field */}
        <div className="form-group">
          <label htmlFor="breed" className="form-label">Breed</label>
          <input
            id="breed"
            type="text"
            placeholder="e.g. Holstein"
            value={breed}
            onChange={e => setBreed(e.target.value)}
            className="form-input"
            required
          />
        </div>

        {/* Date of Birth Field */}
        <div className="form-group">
          <label htmlFor="dob" className="form-label">Date of Birth</label>
          <input
            id="dob"
            type="date"
            value={dob}
            onChange={e => setDob(e.target.value)}
            className="form-input"
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="form-button">
          Create Cow
        </button>
      </form>
    </div>
  );
}