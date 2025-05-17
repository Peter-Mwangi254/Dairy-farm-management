import { useEffect, useState } from 'react';
import API from '../api/api';
import '../App.css';

export default function CowList({ refresh }) {
  const [cows, setCows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    API.get('animal-health/cows/')
      .then((res) => {
      setCows(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      setLoading(false);
    });
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