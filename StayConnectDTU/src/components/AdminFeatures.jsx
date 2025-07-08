import React from 'react';
import './AdminFeatures.css';

const AdminFeatures = () => {
  return (
    <div className="account-section">
      <h3>Website Management</h3>
      <div className="settings-list">
        <div className="setting-item">
          <span>Manage Users</span>
          <button className="secondary-button">Edit</button>
        </div>
        <div className="setting-item">
          <span>Manage Listings</span>
          <button className="secondary-button">Change</button>
        </div>
        <div className="setting-item">
          <span>Manage Essentials</span>
          <button className="secondary-button">Configure</button>
        </div>
        <div className="setting-item">
          <span>Manage Roommates</span>
          <button className="secondary-button">Configure</button>
        </div>
      </div>
    </div>
  );
};

export default AdminFeatures;