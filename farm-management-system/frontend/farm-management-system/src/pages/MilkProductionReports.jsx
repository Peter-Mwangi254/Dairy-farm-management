import React, { useEffect, useState } from 'react';
import axios from '../api/api';
import './MilkProductionReports.css';

function MilkProductionReports() {
  const [productionData, setProductionData] = useState([]);
  const [startDate, setStartDate] = useState('2025-05-01');
  const [endDate, setEndDate] = useState('2025-05-17');

  useEffect(() => {
    async function fetchProductionData() {
      try {
        const response = await axios.get('/milk/milk-production/', {
          params: { start_date: startDate, end_date: endDate },
        });
        setProductionData(response.data);
      } catch (error) {
        console.error('Error fetching production data:', error);
      }
    }

    fetchProductionData();
  }, [startDate, endDate]);

  return (
    <div className="milk-production-reports">
      <h1>Milk Production Reports</h1>
      <div className="date-filters">
        <label>
          Start Date:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <label>
          End Date:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
      </div>
      <table className="production-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Total Liters</th>
          </tr>
        </thead>
        <tbody>
          {productionData.map((entry, index) => (
            <tr key={index}>
              <td>{entry.date}</td>
              <td>{entry.total_liters}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MilkProductionReports;