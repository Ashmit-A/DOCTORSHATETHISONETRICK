import React from 'react';
import './DashboardPages.css';

const MyEssentials = () => {
  return (
    <div className="dashboard-page">
      <div className="dashboard-page-header">
        <h1>My Essentials</h1>
        <p>Manage your essential items and track your marketplace activity</p>
      </div>
      
      <div className="dashboard-page-content">
        <div className="empty-state">
          <div className="empty-state-icon">🛒</div>
          <h3>No Essentials Listed</h3>
          <p>You haven't listed any essential items yet. Start selling your items!</p>
          <button className="primary-button">
            List New Item
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyEssentials; 