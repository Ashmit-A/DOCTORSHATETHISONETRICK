import React from 'react';
import './DashboardPages.css';

const RoommateInfo = () => {
  return (
    <div className="dashboard-page">
      <div className="dashboard-page-header">
        <h1>Roommate Info</h1>
        <p>Manage your roommate preferences and connections</p>
      </div>
      
      <div className="dashboard-page-content">
        <div className="empty-state">
          <div className="empty-state-icon">👥</div>
          <h3>No Roommate Profile</h3>
          <p>You haven't set up your roommate profile yet. Let others know about your preferences!</p>
          <button className="primary-button">
            Create Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoommateInfo; 