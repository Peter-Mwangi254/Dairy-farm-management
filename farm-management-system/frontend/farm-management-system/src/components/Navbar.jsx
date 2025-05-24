import { Link } from 'react-router-dom';
import '../App.css'; // Use the consolidated CSS file

export default function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="navbar-brand">Farm Manager</h1>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/cows">Cows</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/signup">Signup</Link></li>
      </ul>
    </nav>
  );
}