import { useState } from 'react';
import API from '../api/api';

export default function SteamingForm({ cowId, onSuccess }) {
  const [date, setDate] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await API.post('steaming/', { cow: cowId, date });
      setDate('');
      onSuccess?.();
    } catch (err) {
      console.error(err);
      alert('Error recording steaming');
    }
  }

  return (
    <div className="form-container">
      <h3 className="form-title">Steaming</h3>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="steaming-date" className="form-label">Date</label>
          <input
            id="steaming-date"
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="form-input"
            required
          />
        </div>
        <button type="submit" className="form-button">Record Steaming</button>
      </form>
    </div>
  );
}
