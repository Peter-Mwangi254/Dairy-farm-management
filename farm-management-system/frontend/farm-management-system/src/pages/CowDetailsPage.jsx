import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import API from '../api/api';
import DewormingForm from '../components/DewormingForm';
import DewormingList from '../components/DewormingList';
import VaccinationForm from '../components/VaccinationForm';
import VaccinationList from '../components/VaccinationList';
import SteamingForm from '../components/SteamingForm';
import SteamingList from '../components/SteamingList';
import MilkSaleForm from '../components/MilkSaleForm';
import MilkSaleList from '../components/MilkSaleList';
import ArtificialInseminationForm from '../components/ArtificialInseminationForm';
import ArtificialInseminationList from '../components/ArtificialInseminationList';
import '../App.css';

export default function CowDetailsPage() {
  const { id } = useParams();
  const [cow, setCow] = useState(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    API.get(`cows/${id}/`)
      .then((res) => setCow(res.data))
      .catch(console.error);
  }, [id]);

  if (!cow) return <div className="loading-message">Loading…</div>;

  return (
    <div className="cow-details-page">
      <nav className="nav-back">
        <Link to="/cows">← Back to Cows List</Link>
      </nav>
      <div className="details-container">
        <h1 className="details-title">{cow.name}</h1>

        {/* Forms + Lists Grid */}
        <div className="forms-grid">
          <div className="form-section">
            <DewormingForm cowId={id} onSuccess={() => setRefresh(r => !r)} />
            <DewormingList cowId={id} refresh={refresh} />
          </div>

          <div className="form-section">
            <VaccinationForm cowId={id} onSuccess={() => setRefresh(r => !r)} />
            <VaccinationList cowId={id} refresh={refresh} />
          </div>

          <div className="form-section">
            <SteamingForm cowId={id} onSuccess={() => setRefresh(r => !r)} />
            <SteamingList cowId={id} refresh={refresh} />
          </div>

          <div className="form-section">
            <ArtificialInseminationForm cowId={id} onSuccess={() => setRefresh(r => !r)} />
            <ArtificialInseminationList cowId={id} refresh={refresh} />
          </div>

          <div className="form-section">
            <MilkSaleForm cowId={id} onSuccess={() => setRefresh(r => !r)} />
            <MilkSaleList cowId={id} refresh={refresh} />
          </div>
        </div>
      </div>
    </div>
  );
}
