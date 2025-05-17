import { Link } from 'react-router-dom';
import '../App.css';
import { useState } from 'react';

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <button className="toggle-button" onClick={toggleSidebar}>
        {isExpanded ? '⬆' : '⬇'}
      </button>
      {isExpanded && (
        <>
          <h2 className="sidebar-title">Dashboard</h2>
          <ul className="sidebar-links">
            <li><Link to="/dashboard">Overview</Link></li>
            <li><Link to="/cows">Cows</Link></li>
            <li><Link to="/milk">Milk Production</Link></li>
          </ul>
        </>
      )}
    </div>
  );
}