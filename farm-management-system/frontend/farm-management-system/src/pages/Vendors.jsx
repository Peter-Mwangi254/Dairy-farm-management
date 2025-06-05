import React, { useEffect, useState } from 'react';
import API from '../api/api';
import './Vendors.css';

function Vendors() {
  const [vendors, setVendors] = useState([]);
  const [newVendor, setNewVendor] = useState({ name: '', contact_info: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function fetchVendors() {
      try {
        const response = await API.get('milk/vendors/');
        setVendors(response.data);
      } catch (error) {
        console.error('Error fetching vendors:', error);
        setMessage('Error fetching vendors. Please try again.');
      }
    }

    fetchVendors();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVendor({ ...newVendor, [name]: value });
  };

  const handleAddVendor = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post('milk/vendors/', newVendor);
      setVendors([...vendors, response.data]);
      setNewVendor({ name: '', contact_info: '' });
      setMessage('Vendor added successfully!');
    } catch (error) {
      console.error('Error adding vendor:', error);
      setMessage('Error adding vendor. Please try again.');
    }
  };

  const handleDeleteVendor = async (id) => {
    try {
      await API.delete(`milk/vendors/${id}/`);
      setVendors(vendors.filter((vendor) => vendor.id !== id));
      setMessage('Vendor deleted successfully!');
    } catch (error) {
      console.error('Error deleting vendor:', error);
      setMessage('Error deleting vendor. Please try again.');
    }
  };

  return (
    <div className="vendors-container">
      <div className="vendors">
        <h1>Vendors</h1>
        <form onSubmit={handleAddVendor} className="add-vendor-form">
          <div className="form-group">
            <label htmlFor="name">Vendor Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter vendor name"
              value={newVendor.name}
              onChange={handleInputChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="contact_info">Contact Info:</label>
            <input
              type="text"
              id="contact_info"
              name="contact_info"
              placeholder="Enter contact info"
              value={newVendor.contact_info}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>
          <button type="submit" className="form-button">Add Vendor</button>
        </form>
        {message && (
          <p className={message.includes('Error') ? 'error-message' : 'success-message'}>
            {message}
          </p>
        )}
        {vendors.length === 0 ? (
          <p className="no-vendors-message">No vendors available.</p>
        ) : (
          <div className="table-container">
            <table className="vendors-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Contact Info</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {vendors.map((vendor) => (
                  <tr key={vendor.id}>
                    <td>{vendor.name}</td>
                    <td>{vendor.contact_info || 'N/A'}</td>
                    <td>
                      <button
                        onClick={() => handleDeleteVendor(vendor.id)}
                        className="delete-button"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Vendors;