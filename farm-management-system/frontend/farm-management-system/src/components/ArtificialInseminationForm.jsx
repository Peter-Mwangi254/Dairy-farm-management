import { useState } from 'react';
import API from '../api/api';

export default function ArtificialInseminationForm({ cowId, onSuccess }) {
  const [date, setDate] = useState('');
  const [bull, setBull] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await API.post('artificial-insemination/', { cow: cowId, date, bull });
      setDate(''); setBull('');
      onSuccess?.();
    } catch (err) {
      console.error(err);
      alert('Error recording artificial insemination');
    }
  }

  return (
    <div className="form-container">
      <h3 className="form-title">Artificial Insemination</h3>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="ai-date" className="form-label">Date</label>
          <input
            id="ai-date"
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="ai-bull" className="form-label">Bull</label>
          <input
            id="ai-bull"
            type="text"
            placeholder="Bull Name/ID"
            value={bull}
            onChange={e => setBull(e.target.value)}
            className="form-input"
            required
          />
        </div>
        <button type="submit" className="form-button">Record AI</button>
      </form>
    </div>
  );
}
