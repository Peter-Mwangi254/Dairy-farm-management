import { useState } from 'react';
import API from '../api/api';

export default function DewormingForm({ cowId, onSuccess }) {
  const [date, setDate] = useState('');
  const [product, setProduct] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await API.post('deworming/', { cow: cowId, date, deworming_product: product });
      setDate(''); setProduct('');
      onSuccess?.();
    } catch (err) {
      console.error(err);
      alert('Error recording deworming');
    }
  }

  return (
    <div className="form-container">
      <h3 className="form-title">Deworming</h3>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="deworming-date" className="form-label">Date</label>
          <input
            id="deworming-date"
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="deworming-product" className="form-label">Product</label>
          <input
            id="deworming-product"
            type="text"
            placeholder="Product"
            value={product}
            onChange={e => setProduct(e.target.value)}
            className="form-input"
            required
          />
        </div>
        <button type="submit" className="form-button">Record Deworming</button>
      </form>
    </div>
  );
}
