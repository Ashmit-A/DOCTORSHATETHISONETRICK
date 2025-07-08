import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import toast from 'react-hot-toast';
import './DashboardNavbar.css';

const DashboardNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const { user, isAuthenticated, logout } = useAuthStore();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    const result = await logout();
    setIsLoggingOut(false);
    if (result.success) {
      toast.success('Logged out successfully');
      navigate('/');
    } else {
      toast.error(result.message || 'Logout failed');
    }
  };

  const handleUserClick = () => {
    navigate('/dashboard');
    closeMenu();
  };

  const dashboardTabs = [
    { name: 'My Listings', path: '/dashboard/listings' },
    { name: 'My Essentials', path: '/dashboard/essentials' },
    { name: 'Roommate Info', path: '/dashboard/roommate' },
    { name: 'My Account', path: '/dashboard/account' }
  ];

  return (
    <nav className="dashboard-navbar">
      {/* Logo/Home Link */}
      <div className="dashboard-navbar-logo">
        <Link to="/" onClick={closeMenu}>
          <img src="/images/Logo.png" className="dashboard-navbar-logo-image" alt="StayConnectDTU" />
          <span className="dashboard-navbar-brand">StayConnectDTU</span>
        </Link>
      </div>

      {/* Dashboard Tabs */}
      <div className={`dashboard-navbar-tabs ${isMenuOpen ? 'open' : ''}`}>
        <ul className="dashboard-tabs-list">
          {dashboardTabs.map((tab) => (
            <li key={tab.path} className={isActive(tab.path) ? 'active' : ''}>
              <Link to={tab.path} onClick={closeMenu}>
                <span className="tab-name">{tab.name}</span>
              </Link>
            </li>
          ))}
        </ul>

        {/* User Account Section */}
        <div className="dashboard-user-section">
          {isAuthenticated && user && (
            <div className="user-info">
              <span 
                className="user-name" 
                onClick={handleUserClick}
                style={{ cursor: 'pointer' }}
              >
                Hi, {user.name}
              </span>
              <button
                className="logout-button"
                onClick={handleLogout}
                disabled={isLoggingOut}
              >
                {isLoggingOut ? 'Logging out...' : 'Logout'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Hamburger Menu for Mobile */}
      <div className="dashboard-hamburger" onClick={toggleMenu}>
        <div className={`dashboard-bar ${isMenuOpen ? 'bar-1' : ''}`}></div>
        <div className={`dashboard-bar ${isMenuOpen ? 'bar-2' : ''}`}></div>
        <div className={`dashboard-bar ${isMenuOpen ? 'bar-3' : ''}`}></div>
      </div>
    </nav>
  );
};

export default DashboardNavbar; 