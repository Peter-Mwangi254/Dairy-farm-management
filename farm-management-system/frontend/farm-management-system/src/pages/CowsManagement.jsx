import React, { useState } from 'react';
import CowForm from '../components/CowForm';
import CowList from '../components/CowList';
import '../App.css';

function CowsManagement() {
  const [refresh, setRefresh] = useState(false);

  const handleSuccess = () => {
    setRefresh(!refresh); // Toggle refresh to reload the cow list
  };

  return (
    <div className="cows-management-container">
      <div className="cow-list-page">
        <h1 className="page-title">Cows Management</h1>
        <div className="content-container">
          <CowForm onSuccess={handleSuccess} />
          <CowList refresh={refresh} />
        </div>
      </div>
    </div>
  );
}

export default CowsManagement;