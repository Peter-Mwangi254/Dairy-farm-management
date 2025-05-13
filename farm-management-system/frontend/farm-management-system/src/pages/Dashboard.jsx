import { useState, useEffect } from 'react';
import API from '../api/api';
import { mockSalesData, mockHealthStatus } from '../mock/mockData'; // Import mock data
import Spinner from '../components/Spinner';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

export default function Dashboard() {
  const [cowCount, setCowCount] = useState(0);
  const [totalMilk, setTotalMilk] = useState(0);
  const [averageMilk, setAverageMilk] = useState(0);
  const [healthyCows, setHealthyCows] = useState(0);
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // const fetchData = () => {
  //   setLoading(true);
  //   setError(null);
  //   Promise.all([
  //     API.get('cows/'),
  //     API.get('milk-sales/dashboard/'),
  //     API.get('cows/health-status/')
  //   ])
  //     .then(([cowsRes, salesRes, healthRes]) => {
  //       const cows = cowsRes.data;
  //       setCowCount(cows.length);
  //       setTotalMilk(salesRes.data.reduce((sum, sale) => sum + sale.total_liters, 0));
  //       setAverageMilk((salesRes.data.reduce((sum, sale) => sum + sale.total_liters, 0) / cows.length).toFixed(2));
  //       setHealthyCows(healthRes.data.healthy_cows);
  //       setSalesData(salesRes.data);
  //     })
  //     .catch(() => setError('Failed to load dashboard data'))
  //     .finally(() => setLoading(false));
  // };

  useEffect(() => {
    setLoading(true);
    // Use mock data instead of API calls
    setTimeout(() => {
      setCowCount(50); // Example static value
      setTotalMilk(mockSalesData.reduce((sum, sale) => sum + sale.total_liters, 0));
      setAverageMilk((mockSalesData.reduce((sum, sale) => sum + sale.total_liters, 0) / 50).toFixed(2)); // Example calculation
      setHealthyCows(mockHealthStatus.healthy_cows);
      setSalesData(mockSalesData);
      setLoading(false);
    }, 500); // Simulate API delay
  }, []);

  if (loading) return <Spinner />;
  // if (error) return (
  //   <div className="error-container">
  //     <p className="error-message">{error}</p>
  //     <button className="retry-button" onClick={fetchData}>Retry</button>
  //   </div>
  // );

  return (
    <div className="dashboard-page">
      <h1 className="dashboard-title">Dashboard</h1>
      <div className="dashboard-metrics">
        <div className="metric-card">
          <h2>Total Cows</h2>
          <p>{cowCount}</p>
        </div>
        <div className="metric-card">
          <h2>Total Milk Produced</h2>
          <p>{totalMilk} liters</p>
        </div>
        <div className="metric-card">
          <h2>Average Milk Per Cow</h2>
          <p>{averageMilk} liters</p>
        </div>
        <div className="metric-card">
          <h2>Healthy Cows</h2>
          <p>{healthyCows}</p>
        </div>
      </div>
      <div className="dashboard-chart">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={salesData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <XAxis dataKey="vendor__name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="total_liters" fill="#2f855a" name="Total Liters Sold" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}