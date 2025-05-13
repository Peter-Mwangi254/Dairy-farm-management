import { useEffect, useState } from 'react';
import { mockCows } from '../mock/mockData'; // Import mock data
import '../App.css';

export default function CowList({ refresh }) {
  const [cows, setCows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Use mock data instead of API call
    setTimeout(() => {
      setCows(mockCows);
      setLoading(false);
    }, 500); // Simulate API delay
  }, [refresh]);

  if (loading) return <div className="loading-message">Loading...</div>;
  if (!cows.length) return <div className="no-cows-message">No cows found. Add one above!</div>;

  return (
    <div className="table-container">
      <table className="cow-table">
        <thead>
          <tr>
            <th className="table-header">Name</th>
            <th className="table-header">Breed</th>
            <th className="table-header">Date of Birth</th>
          </tr>
        </thead>
        <tbody>
          {cows.map((cow) => (
            <tr key={cow.id} className="table-row">
              <td className="table-cell">{cow.name}</td>
              <td className="table-cell">{cow.breed}</td>
              <td className="table-cell">{cow.date_of_birth}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}