import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroPage from './pages/HeroPage';
import CowListPage from './pages/CowListPage';
import CowDetailsPage from './pages/CowDetailsPage';
import Dashboard from './pages/Dashboard';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import { AuthProvider } from './hooks/useAuth.jsx';
import ProtectedRoute from './components/ProtectedRoute';
import MilkSalesDashboard from './pages/MilkSalesDashboard';
import ManageMilkSales from './pages/ManageMilkSales';
import Vendors from './pages/Vendors';
import MilkProductionReports from './pages/MilkProductionReports';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import './App.css';

function App() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isSignupPage = window.location.pathname === '/signup';

  return (
    <AuthProvider>
      <div className="app-container">
        <Navbar />
        {!isHomePage && !isSignupPage && <Sidebar />}
        <div className="content">
          <Routes>
            <Route path="/" element={<HeroPage />} />
            <Route path="/cows" element={<CowListPage />} />
            <Route path="/cows/:id" element={<CowDetailsPage />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/milk-sales-dashboard"
              element={
                <ProtectedRoute>
                  <MilkSalesDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manage-milk-sales"
              element={
                <ProtectedRoute>
                  <ManageMilkSales />
                </ProtectedRoute>
              }
            />
            <Route
              path="/vendors"
              element={
                <ProtectedRoute>
                  <Vendors />
                </ProtectedRoute>
              }
            />
            <Route
              path="/milk-production-reports"
              element={
                <ProtectedRoute>
                  <MilkProductionReports />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cows-management"
              element={
                <ProtectedRoute>
                  <div>Cows Management</div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/vaccination-deworming"
              element={
                <ProtectedRoute>
                  <div>Vaccination & Deworming</div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/steaming-records"
              element={
                <ProtectedRoute>
                  <div>Steaming Records</div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/feed-expenses"
              element={
                <ProtectedRoute>
                  <div>Feed Expenses</div>
                </ProtectedRoute>
              }
            />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="*" element={<p className="loading-message">Page not found</p>} />
          </Routes>
        </div>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;