import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from '../api/api';
import './MilkSalesDashboard.css';

function MilkSalesDashboard() {
  const [dashboardData, setDashboardData] = useState([]);
  const [totalMilkSold, setTotalMilkSold] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [feedExpenses, setFeedExpenses] = useState(0); // Placeholder for feed expenses

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const response = await axios.get('/milk/milk-sales/dashboard/');
        setDashboardData(response.data);

        const totalMilk = response.data.reduce((sum, item) => sum + item.total_liters, 0);
        setTotalMilkSold(totalMilk);

        const revenue = totalMilk * 60; // Assuming $60 per liter
        setTotalRevenue(revenue);

        // Placeholder for feed expenses (replace with actual API call if available)
        setFeedExpenses(5000); // Example value
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    }

    fetchDashboardData();
  }, []);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Milk Sales Dashboard</h1>
        <div className="header-info">
          <span>{new Date().toLocaleDateString('en-US', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' })}</span>
          <span>May 2025</span>
        </div>
      </header>
      <div className="dashboard-content">
        <div className="dashboard-metrics">
          <div className="metric-card">
            <h2>Total Milk Sold</h2>
            <p>{totalMilkSold} liters</p>
          </div>
          <div className="metric-card">
            <h2>Total Revenue</h2>
            <p>KES {totalRevenue.toFixed(2)}</p>
          </div>
          <div className="metric-card">
            <h2>Feed Expenses</h2>
            <p>KES {feedExpenses.toFixed(2)}</p>
          </div>
        </div>
        <div className="dashboard-chart-section">
          <h2>Daily Trends</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dashboardData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="vendor__name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="total_liters" stroke="#2e7d32" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default MilkSalesDashboard;