import { useEffect, useState } from 'react';
import API from '../api/api';
import '../App.css';

export default function CowList({ refresh }) {
  const [cows, setCows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    API.get('animal-health/cows/')
      .then((res) => {
        setCows(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching cows:', err);
        setError('Failed to load cows. Please try again.');
        setLoading(false);
      });
  }, [refresh]);

  const handleDeleteCow = async (id) => {
    if (!window.confirm('Are you sure you want to delete this cow?')) {
      return;
    }

    try {
      await API.delete(`animal-health/cows/${id}/`);
      setCows(cows.filter((cow) => cow.id !== id));
    } catch (err) {
      console.error('Error deleting cow:', err);
      setError('Failed to delete cow. Please try again.');
    }
  };

  if (loading) return <div className="loading-message">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!cows.length) return <div className="no-cows-message">No cows found. Add one above!</div>;

  return (
    <div className="table-container">
      <table className="cow-table">
        <thead>
          <tr>
            <th className="table-header">Name</th>
            <th className="table-header">Breed</th>
            <th className="table-header">Date of Birth</th>
            <th className="table-header">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cows.map((cow) => (
            <tr key={cow.id} className="table-row">
              <td className="table-cell">{cow.name}</td>
              <td className="table-cell">{cow.breed}</td>
              <td className="table-cell">{cow.date_of_birth}</td>
              <td className="table-cell">
                <button
                  onClick={() => handleDeleteCow(cow.id)}
                  className="delete-button"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}