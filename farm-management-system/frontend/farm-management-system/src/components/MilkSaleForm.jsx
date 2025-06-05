import React, { useState, useEffect } from 'react';
import API from '../api/api';

function MilkSaleForm({ onSuccess }) {
  const [vendorId, setVendorId] = useState('');
  const [litersSold, setLitersSold] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState(null);
  const [vendors, setVendors] = useState([]);
  const [message, setMessage] = useState(null); // State for success message

  useEffect(() => {
    API.get('milk/vendors/')
      .then((res) => setVendors(res.data))
      .catch((err) => console.error('Failed to fetch vendors:', err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!vendorId) {
      setError('Please select a vendor.');
      console.error('Vendor ID is missing');
      return;
    }

    try {
      const payload = { vendor: vendorId, liters_sold: parseFloat(litersSold), date };
      console.log('Payload:', { vendor: vendorId, liters_sold: litersSold, date }); // Debugging line to check the payload
      await API.post('milk/milk-sales/', payload);
      setVendorId('');
      setLitersSold('');
      setDate('');
      setMessage('Milk sale entered successfully!'); // Set success message
      setTimeout(() => setMessage(null), 5000); // Clear message after 3 seconds
      if (onSuccess) onSuccess();
    } catch (err) {
      setError('Failed to add milk sale. Please try again.');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="milk-sale-form">
      <h2>Add Milk Sale</h2>
      {error && <p className="error-message">{error}</p>}
      {message && <p className="success-message">{message}</p>} {/* Display success message */}
      <div className="form-group">
        <label htmlFor="vendor">Vendor:</label>
        <select
          id="vendor"
          value={vendorId}
          onChange={(e) => setVendorId(e.target.value)}
          required
        >
          <option value="">Select a vendor</option>
          {vendors.map((vendor) => (
            <option key={vendor.id} value={vendor.id}>
              {vendor.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="liters">Liters Sold:</label>
        <input
          type="number"
          id="liters"
          value={litersSold}
          onChange={(e) => setLitersSold(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="submit-button">Add Sale</button>
    </form>
  );
}

export default MilkSaleForm;
