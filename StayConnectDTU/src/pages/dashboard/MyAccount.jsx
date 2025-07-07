import React from 'react';
import useAuthStore from '../../store/authStore';
import './DashboardPages.css';

const MyAccount = () => {
  const { user } = useAuthStore();

  return (
    <div className="dashboard-page">
      <div className="dashboard-page-header">
        <h1>My Account</h1>
        <p>Manage your account settings and preferences</p>
      </div>
      
      <div className="dashboard-page-content">
        <div className="account-section">
          <h3>Profile Information</h3>
          <div className="profile-card">
            <div className="profile-avatar">
              <span className="avatar-text">{user?.name?.charAt(0) || 'U'}</span>
            </div>
            <div className="profile-details">
              <h4>{user?.name || 'User Name'}</h4>
              <p>{user?.email || 'user@example.com'}</p>
              {user?.is_admin && (
                <span className="admin-badge">Administrator</span>
              )}
            </div>
          </div>
        </div>

        <div className="account-section">
          <h3>Account Settings</h3>
          <div className="settings-list">
            <div className="setting-item">
              <span>Edit Profile</span>
              <button className="secondary-button">Edit</button>
            </div>
            <div className="setting-item">
              <span>Change Password</span>
              <button className="secondary-button">Change</button>
            </div>
            <div className="setting-item">
              <span>Notification Preferences</span>
              <button className="secondary-button">Configure</button>
            </div>
          </div>
        </div>
        {user?.is_admin && <div className="account-section">
          <h3>Manage website</h3>
          <div className="settings-list">
            <div className="setting-item">
              <span>Users</span>
              <button className="secondary-button">Edit</button>
            </div>
            <div className="setting-item">
              <span>Listings</span>
              <button className="secondary-button">Change</button>
            </div>
            <div className="setting-item">
              <span>Essentials</span>
              <button className="secondary-button">Configure</button>
            </div>
            <div className="setting-item">
              <span>Roommates</span>
              <button className="secondary-button">Configure</button>
            </div>
          </div>
        </div>}
      </div>
    </div>
  );
};

export default MyAccount; 