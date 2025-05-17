import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroPage from './pages/HeroPage';
import CowListPage from './pages/CowListPage';
import CowDetailsPage from './pages/CowDetailsPage';
import Dashboard from './pages/Dashboard';
import Footer from './components/Footer';
import './App.css';

export default function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HeroPage />} />
        <Route path="/cows" element={<CowListPage />} />
        <Route path="/cows/:id" element={<CowDetailsPage />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="*" element={<p className="loading-message">Page not found</p>} />
      </Routes>
      <Footer />
    </div>
  );
}