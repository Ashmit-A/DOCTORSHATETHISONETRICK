import React from 'react';
import './DashboardPages.css';

const MyListings = () => {
  return (
    <div className="dashboard-page">
      <div className="dashboard-page-header">
        <h1>My Listings</h1>
        <p>Manage your property listings and track their performance</p>
      </div>
      
      <div className="dashboard-page-content">
        <div className="empty-state">
          <div className="empty-state-icon">🏠</div>
          <h3>No Listings Yet</h3>
          <p>You haven't created any listings yet. Start by adding your first property!</p>
          <button className="primary-button">
            Create New Listing
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyListings; 