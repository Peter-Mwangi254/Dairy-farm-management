import React, { useState, useEffect } from 'react';
import API from '../api/api';
import MilkSaleList from '../components/MilkSaleList';
import MilkSaleForm from '../components/MilkSaleForm';
import './ManageMilkSales.css';

function ManageMilkSales() {
  const [selectedVendorId, setSelectedVendorId] = useState('');
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    API.get('milk/vendors/')
      .then((res) => setVendors(res.data))
      .catch((err) => console.error('Failed to fetch vendors:', err));
  }, []);

  const handleVendorChange = (e) => {
    setSelectedVendorId(e.target.value);
  };

  return (
    <div className="manage-milk-sales">
      <h1>Manage Milk Sales</h1>
      <MilkSaleForm onSuccess={() => window.location.reload()} />
      <div className="form-group">
        <label htmlFor="vendor">Filter by Vendor:</label>
        <select id="vendor" value={selectedVendorId} onChange={handleVendorChange}>
          <option value="">All Vendors</option>
          {vendors.map((vendor) => (
            <option key={vendor.id} value={vendor.id}>
              {vendor.name}
            </option>
          ))}
        </select>
      </div>
      <MilkSaleList vendorId={selectedVendorId} />
    </div>
  );
}

export default ManageMilkSales;