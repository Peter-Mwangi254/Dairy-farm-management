import React, { useState, useEffect } from 'react';
import API from '../api/api';
import VaccinationForm from '../components/VaccinationForm';
import VaccinationList from '../components/VaccinationList';
import DewormingForm from '../components/DewormingForm';
import DewormingList from '../components/DewormingList';
import '../App.css';

function VaccinationDeworming() {
  const [cows, setCows] = useState([]);
  const [selectedCow, setSelectedCow] = useState('');
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    API.get('animal-health/cows/')
      .then((res) => {
        setCows(res.data);
        if (res.data.length > 0) {
          setSelectedCow(res.data[0].id); // Select the first cow by default
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching cows:', err);
        setError('Failed to load cows. Please try again.');
        setLoading(false);
      });
  }, []);

  const handleSuccess = () => {
    setRefresh(!refresh); // Toggle refresh to reload vaccination and deworming lists
  };

  return (
    <div className="vaccination-deworming-container">
      <div className="vaccination-deworming">
        <h1 className="page-title">Vaccination & Deworming</h1>
        {loading ? (
          <p className="loading-message">Loading...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : cows.length === 0 ? (
          <p className="no-cows-message">No cows available. Please add a cow first.</p>
        ) : (
          <div className="content-container">
            <div className="cow-selector">
              <label htmlFor="cow-select" className="form-label">Select Cow:</label>
              <select
                id="cow-select"
                value={selectedCow}
                onChange={(e) => setSelectedCow(e.target.value)}
                className="form-input"
              >
                {cows.map((cow) => (
                  <option key={cow.id} value={cow.id}>
                    {cow.name} ({cow.breed})
                  </option>
                ))}
              </select>
            </div>
            <div className="records-section">
              <h2 className="section-title">Vaccination Records</h2>
              <VaccinationForm cowId={selectedCow} onSuccess={handleSuccess} />
              <VaccinationList cowId={selectedCow} refresh={refresh} />
            </div>
            <div className="records-section">
              <h2 className="section-title">Deworming Records</h2>
              <DewormingForm cowId={selectedCow} onSuccess={handleSuccess} />
              <DewormingList cowId={selectedCow} refresh={refresh} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default VaccinationDeworming;