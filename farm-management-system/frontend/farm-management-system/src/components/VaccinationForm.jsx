import { useState } from 'react';
import API from '../api/api';

export default function VaccinationForm({ cowId, onSuccess }) {
  const [date, setDate] = useState('');
  const [vaccine, setVaccine] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await API.post('vaccination/', { cow: cowId, date, vaccine_name: vaccine });
      setDate(''); setVaccine('');
      onSuccess?.();
    } catch (err) {
      console.error(err);
      alert('Error recording vaccination');
    }
  }

  return (
    <div className="form-container">
      <h3 className="form-title">Vaccination</h3>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="vaccination-date" className="form-label">Date</label>
          <input
            id="vaccination-date"
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="vaccine-name" className="form-label">Vaccine Name</label>
          <input
            id="vaccine-name"
            type="text"
            placeholder="Vaccine Name"
            value={vaccine}
            onChange={e => setVaccine(e.target.value)}
            className="form-input"
            required
          />
        </div>
        <button type="submit" className="form-button">Record Vaccination</button>
      </form>
    </div>
  );
}
