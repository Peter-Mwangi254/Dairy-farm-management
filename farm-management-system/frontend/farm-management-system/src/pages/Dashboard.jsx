import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from '../api/api';
import '../App.css';

export default function Dashboard() {
  const [overviewData, setOverviewData] = useState([]);
  const [milkProductionData, setMilkProductionData] = useState([]);
  const [startDate, setStartDate] = useState('2025-05-10');
  const [endDate, setEndDate] = useState('2025-05-17');

  useEffect(() => {
    async function fetchData() {
      try {
        const salesResponse = await axios.get('/milk/milk-sales/dashboard/');
        const productionResponse = await axios.get('milk/milk-production/', {
          params: { start_date: startDate, end_date: endDate },
        });
        setOverviewData(salesResponse.data);
        setMilkProductionData(productionResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, [startDate, endDate]);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Dairy Farm Dashboard</h1>
        <div className="profile-section">
          <span>👤 Admin</span>
          <span>{new Date().toLocaleDateString()}</span>
        </div>
      </header>

      <div className="overview-cards">
        {overviewData.map((card, index) => (
          <div key={index} className="card">
            <span className="card-icon">{card.icon}</span>
            <h2>{card.title}</h2>
            <p>{card.value}</p>
          </div>
        ))}
      </div>

      <div className="chart-section">
        <h2>Milk Production (Filtered by Date Range)</h2>
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
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={milkProductionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="liters" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="summary-section">
        <div className="summary-card">
          <h2>Milk Sales Summary</h2>
          <p>Weekly Revenue: $560</p>
        </div>
        <div className="summary-card">
          <h2>Feed Costs Summary</h2>
          <p>Weekly Feed Costs: $200</p>
        </div>
      </div>
    </div>
  );
}