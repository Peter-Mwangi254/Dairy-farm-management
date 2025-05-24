import React, { useEffect, useState } from 'react';
import axios from '../api/api';
import './Vendors.css';

function Vendors() {
  const [vendors, setVendors] = useState([]);
  const [newVendor, setNewVendor] = useState({ name: '', contact_info: '' });

  useEffect(() => {
    async function fetchVendors() {
      try {
        const response = await axios.get('/milk/vendors/');
        setVendors(response.data);
      } catch (error) {
        console.error('Error fetching vendors:', error);
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
      const response = await axios.post('/milk/vendors/', newVendor);
      setVendors([...vendors, response.data]);
      setNewVendor({ name: '', contact_info: '' });
    } catch (error) {
      console.error('Error adding vendor:', error);
    }
  };

  return (
    <div className="vendors">
      <h1>Vendors</h1>
      <form onSubmit={handleAddVendor} className="add-vendor-form">
        <input
          type="text"
          name="name"
          placeholder="Vendor Name"
          value={newVendor.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="contact_info"
          placeholder="Contact Info"
          value={newVendor.contact_info}
          onChange={handleInputChange}
        />
        <button type="submit">Add Vendor</button>
      </form>
      <table className="vendors-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Contact Info</th>
          </tr>
        </thead>
        <tbody>
          {vendors.map((vendor) => (
            <tr key={vendor.id}>
              <td>{vendor.name}</td>
              <td>{vendor.contact_info}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Vendors;