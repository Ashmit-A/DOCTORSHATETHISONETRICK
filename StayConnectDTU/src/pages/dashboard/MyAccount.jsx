import React from 'react';
import useAuthStore from '../../store/authStore';
import './DashboardPages.css';
import AdminFeatures from '../../components/AdminFeatures';

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
              <div className="profile-name-section">
                <h4>{user?.name || 'User Name'}</h4>
                {user?.is_verified && (
                  <span className="verified-badge" title="Verified Account">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                )}
              </div>
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
        {user?.is_admin && <AdminFeatures />}
      </div>
    </div>
  );
};

export default MyAccount; 