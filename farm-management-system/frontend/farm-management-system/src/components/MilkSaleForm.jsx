import { useState } from 'react';
import API from '../api/api';

export default function MilkSaleForm({ cowId, onSuccess }) {
  const [liters, setLiters] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await API.post('milk-sales/', { vendor: cowId, liters_sold: liters });
      setLiters('');
      onSuccess?.();
    } catch (err) {
      console.error(err);
      alert('Error recording milk sale');
    }
  }

  return (
    <div className="form-container">
      <h3 className="form-title">Milk Sale</h3>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="sale-liters" className="form-label">Liters Sold</label>
          <input
            id="sale-liters"
            type="number"
            step="0.01"
            placeholder="e.g. 10.5"
            value={liters}
            onChange={e => setLiters(e.target.value)}
            className="form-input"
            required
          />
        </div>
        <button type="submit" className="form-button">Record Sale</button>
      </form>
    </div>
  );
}
