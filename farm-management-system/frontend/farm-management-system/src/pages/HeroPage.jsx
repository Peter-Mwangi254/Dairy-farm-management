import { Link } from 'react-router-dom';
import '../App.css'; // Use the consolidated CSS file

export default function HeroPage() {
  return (
    <div className="hero-page">
      <div className="hero-content">
        <h1 className="hero-title">Welcome to Dairy Management System</h1>
        <p className="hero-subtitle">Effortlessly manage your dairy farm operations.</p>
        <div className="hero-buttons">
          <Link to="/cows" className="hero-button">
            Manage Cows
          </Link>
          <Link to="/dashboard" className="hero-button">
            View Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}