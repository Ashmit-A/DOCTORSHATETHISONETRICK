import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { menuLinks } from '../assets/assets';
import useAuthStore from '../store/authStore';
import toast from 'react-hot-toast';
import './Navbar.css';

const Navbar = ({ setShowLogin, showLogin }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false); // Local loading state for logout
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

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar-logo">
        <Link to="/" onClick={closeMenu}>
          <img src="/images/Logo.png" className="navbar-logo-image" />
          StayConnectDTU
        </Link>
      </div>

      {/* Navigation Links and Login */}
      <div className={`navbar-links-wrapper ${isMenuOpen ? 'open' : ''}`}>
        {/* Navigation Links */}
        <ul className="navbar-links">
          {menuLinks.map((link) => (
            <li key={link.path} className={isActive(link.path) ? 'active' : ''}>
              <Link to={link.path} onClick={closeMenu}>
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Login/User Buttons */}
        <div className="navbar-login-group">
          {isAuthenticated ? (
            <>
              <button
                className="login-button"
                onClick={() => navigate('/dashboard')}
              >
                Dashboard
              </button>
              <button
                className="login-button"
                onClick={handleLogout}
                disabled={isLoggingOut}
              >
                {isLoggingOut ? 'Logging out...' : 'Logout'}
              </button>
            </>
          ) : (
            <button
              className="login-button"
              onClick={() => setShowLogin(true)}
            >
              Login
            </button>
          )}
        </div>
      </div>

      {/* Hamburger Menu for Mobile */}
      <div className="hamburger" onClick={toggleMenu}>
        <div className={`bar ${isMenuOpen ? 'bar-1' : ''}`}></div>
        <div className={`bar ${isMenuOpen ? 'bar-2' : ''}`}></div>
        <div className={`bar ${isMenuOpen ? 'bar-3' : ''}`}></div>
      </div>
    </nav>
  );
};

export default Navbar;
