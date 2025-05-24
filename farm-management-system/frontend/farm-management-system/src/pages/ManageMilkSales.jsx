import React, { useEffect, useState } from 'react';
import axios from '../api/api';
import './ManageMilkSales.css';

function ManageMilkSales() {
  const [sales, setSales] = useState([]);
  const [newSale, setNewSale] = useState({ vendor: '', liters_sold: '' });

  useEffect(() => {
    async function fetchSales() {
      try {
        const response = await axios.get('/milk/milk-sales/');
        setSales(response.data);
      } catch (error) {
        console.error('Error fetching sales:', error);
      }
    }

    fetchSales();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSale({ ...newSale, [name]: value });
  };

  const handleAddSale = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/milk/milk-sales/', newSale);
      setSales([...sales, response.data]);
      setNewSale({ vendor: '', liters_sold: '' });
    } catch (error) {
      console.error('Error adding sale:', error);
    }
  };

  return (
    <div className="manage-milk-sales">
      <h1>Manage Milk Sales</h1>
      <form onSubmit={handleAddSale} className="add-sale-form">
        <input
          type="text"
          name="vendor"
          placeholder="Vendor Name"
          value={newSale.vendor}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="liters_sold"
          placeholder="Liters Sold"
          value={newSale.liters_sold}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Add Sale</button>
      </form>
      <table className="sales-table">
        <thead>
          <tr>
            <th>Vendor</th>
            <th>Date</th>
            <th>Liters Sold</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale) => (
            <tr key={sale.id}>
              <td>{sale.vendor}</td>
              <td>{sale.date}</td>
              <td>{sale.liters_sold}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageMilkSales;