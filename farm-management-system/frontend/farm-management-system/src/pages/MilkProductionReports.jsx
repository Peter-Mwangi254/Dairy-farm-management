import React, { useEffect, useState, useRef } from 'react';
import axios from '../api/api';
import generatePDF from 'react-to-pdf';
import './MilkProductionReports.css';

function MilkProductionReports() {
  const [productionData, setProductionData] = useState([]);
  const [startDate, setStartDate] = useState('2025-05-01');
  const [endDate, setEndDate] = useState('2025-05-25'); // Current date
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const targetRef = useRef(); // Ref to target the table content for PDF

  useEffect(() => {
    async function fetchProductionData() {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('/milk/milk-production/', {
          params: { start_date: startDate, end_date: endDate },
        });
        if (response.data && Array.isArray(response.data)) {
          setProductionData(response.data);
        } else {
          setProductionData([]);
          setError('No data available for the selected date range.');
        }
      } catch (error) {
        console.error('Error fetching production data:', error);
        setError('Failed to fetch production data. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    fetchProductionData();
  }, [startDate, endDate]);

  return (
    <div className="milk-production-reports-container">
      <div className="milk-production-reports">
        <h1>Milk Production Reports</h1>
        <div className="date-filters">
          <div className="form-group">
            <label htmlFor="startDate">Start Date:</label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="endDate">End Date:</label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="form-input"
            />
          </div>
          <button
            onClick={() => generatePDF(targetRef, { filename: 'milk-production-report.pdf' })}
            className="form-button"
          >
            Download PDF
          </button>
        </div>
        {loading ? (
          <p className="loading-message">Loading...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : productionData.length === 0 ? (
          <p className="no-data-message">No production data available for the selected range.</p>
        ) : (
          <div className="table-container" ref={targetRef}>
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
                    <td>{entry.date || 'N/A'}</td>
                    <td>{entry.total_liters || 0}</td>
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

export default MilkProductionReports;