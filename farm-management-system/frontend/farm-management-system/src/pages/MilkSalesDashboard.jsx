import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from '../api/api';
import './MilkSalesDashboard.css';

function MilkSalesDashboard() {
  const [dashboardData, setDashboardData] = useState([]);
  const [totalMilkSold, setTotalMilkSold] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const response = await axios.get('/milk/milk-sales/dashboard/');
        setDashboardData(response.data);

        const totalMilk = response.data.reduce((sum, item) => sum + item.total_liters, 0);
        setTotalMilkSold(totalMilk);

        const revenue = totalMilk * 60; // Assuming price per liter is 60
        setTotalRevenue(revenue);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    }

    fetchDashboardData();
  }, []);

  return (
    <div className="milk-sales-dashboard">
      <h1>Milk Sales Dashboard</h1>
      <div className="dashboard-summary">
        <div className="summary-card">
          <h2>Total Milk Sold</h2>
          <p>{totalMilkSold} liters</p>
        </div>
        <div className="summary-card">
          <h2>Total Revenue</h2>
          <p>KES {totalRevenue.toFixed(2)}</p>
        </div>
      </div>
      <div className="dashboard-chart">
        <h2>Daily Trends</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dashboardData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="vendor__name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="total_liters" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default MilkSalesDashboard;