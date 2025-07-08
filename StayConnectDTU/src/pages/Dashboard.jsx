import React from 'react';
import useAuthStore from '../store/authStore';
import './Dashboard.css';

const Dashboard = () => {
    const { user } = useAuthStore();

    return (
        <div className="main-dashboard-wrapper">
            <div className="dashboard-container">
                <div className="dashboard-header">
                    <h1 className="dashboard-title">Dashboard</h1>
                </div>

                <div className="user-info">
                    <div className="user-left-section">
                        <div className="profile-avatar">
                            <span className="avatar-text">{user?.name?.charAt(0) || 'U'}</span>
                        </div>
                        <h2 className="welcome-text">Welcome, {user?.name}!</h2>
                    </div>
                    <div className="user-details">
                        <p><strong>Email:</strong> {user?.email}</p>
                        {user?.is_admin && (
                            <p><strong>Role:</strong> Administrator</p>
                        )}
                    </div>
                </div>

                <div className="dashboard-content">
                    <h3 className="content-title">Your Dashboard</h3>
                    <p className="content-description">Welcome to your dashboard. More features coming soon!</p>

                    <div className="dashboard-stats">
                        <div className="stat-card">
                            <h4>My Listings</h4>
                            <p className="stat-number">0</p>
                        </div>

                        <div className="stat-card">
                            <h4>Messages</h4>
                            <p className="stat-number">0</p>
                        </div>

                        <div className="stat-card">
                            <h4>Favorites</h4>
                            <p className="stat-number">0</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;