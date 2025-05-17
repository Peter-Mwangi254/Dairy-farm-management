import { useState, useEffect } from 'react';
import API from '../api/api';
import Spinner from '../components/Spinner';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import '../App.css';

export default function Dashboard() {
  const [cowCount, setCowCount] = useState(0);
  const [totalMilk, setTotalMilk] = useState(0);
  const [healthyCows] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSection, setSelectedSection] = useState('overview');

  const fetchData = () => {
    setLoading(true);
    setError(null);
    Promise.all([
      API.get('animal-health/cows/'),
      API.get('milk/milk-sales/dashboard/'),
      API.get('animal-health/cows/health-status/')
    ])
      .then(([cowsRes, salesRes]) => {
        const cows = cowsRes.data;
        setCowCount(cows.length);
        setTotalMilk(salesRes.data.reduce((sum, sale) => sum + sale.total_liters, 0));
      })
      .catch(() => setError('Failed to load dashboard data'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <Spinner />;
  if (error) return (
    <div className="error-container">
      <p className="error-message">{error}</p>
      <button className="retry-button" onClick={fetchData}>Retry</button>
    </div>
  );

  const data = {
    overview: [
      { name: 'Cows', value: cowCount },
      { name: 'Milk Produced', value: totalMilk },
    ],
    cows: [
      { name: 'Healthy Cows', count: healthyCows },
      { name: 'Total Cows', count: cowCount },
    ],
    milk: [],
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <div className="dashboard-tabs">
          <button onClick={() => setSelectedSection('overview')}>Overview</button>
          <button onClick={() => setSelectedSection('cows')}>Cows</button>
          <button onClick={() => setSelectedSection('milk')}>Milk Production</button>
        </div>
      </div>

      <div className="dashboard-content">
        {selectedSection === 'overview' && (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.overview}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        )}

        {selectedSection === 'cows' && (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.cows}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        )}

        {selectedSection === 'milk' && (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.milk}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="liters" fill="#ffc658" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}