import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Farm Admin</h2>
      <ul>
      <li><Link to="/milk-sales-dashboard"><i className="bi bi-speedometer2"></i> Milk Sales Dashboard</Link></li>
      <li><Link to="/manage-milk-sales"><i className="bi bi-cart-check"></i> Manage Milk Sales</Link></li>
      <li><Link to="/vendors"><i className="bi bi-person-lines-fill"></i> Vendors</Link></li>
      <li><Link to="/milk-production-reports"><i className="bi bi-clipboard-data"></i> Milk Production Reports</Link></li>
      <li><Link to="/cows-management"><i className="bi bi-cpu"></i> Cows Management</Link></li>
      <li><Link to="/vaccination-deworming"><i className="bi bi-bandaid"></i> Vaccination & Deworming</Link></li>
      <li><Link to="/steaming-records"><i className="bi bi-journal-text"></i> Steaming Records</Link></li>
      <li><Link to="/feed-expenses"><i className="bi bi-cash-coin"></i> Feed Expenses</Link></li>

      </ul>
    </div>
  );
}

export default Sidebar;