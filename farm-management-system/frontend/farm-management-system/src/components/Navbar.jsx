import { Link } from 'react-router-dom';
import { useState } from 'react';
import '../App.css'; // Consolidated CSS file

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    // Add your logout logic here
  };

  return (
    <nav className="navbar">
      <h1 className="navbar-brand">🐄 DairyMS</h1>
      <button className="hamburger-menu" onClick={toggleMenu}>
        ☰
      </button>
      <ul className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
        <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
        <li><a href="#features" onClick={() => setIsMenuOpen(false)}>Features</a></li>
        <li><a href="#pricing" onClick={() => setIsMenuOpen(false)}>Pricing</a></li>
        <li><a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a></li>
        <li><Link to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link></li>
        <li><Link to="/signup" className="signup-button" onClick={() => setIsMenuOpen(false)}>Sign Up</Link></li>
      </ul>
      <ul className="navbar-links">
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><button className="logout-button" onClick={handleLogout}>Logout</button></li>
      </ul>
    </nav>
  );
}
