import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroPage from './pages/HeroPage';
import CowListPage from './pages/CowListPage';
import CowDetailsPage from './pages/CowDetailsPage';
import Dashboard from './pages/Dashboard';
import './App.css';

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HeroPage />} />
        {/* <Route path="/" element={<Navigate to="/cows" replace />} /> */}
        <Route path="/cows" element={<CowListPage />} />
        <Route path="/cows/:id" element={<CowDetailsPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<p className="loading-message">Page not found</p>} />
      </Routes>
    </>
  );
}