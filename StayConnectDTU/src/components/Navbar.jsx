import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { menuLinks } from '../assets/assets';
import './Navbar.css';


const Navbar = ({ setShowLogin }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
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

        {/* Login Button */}
        <div className="navbar-login-group">
          <button
            className="login-button"
            onClick={()=>navigate('/owner')}
          >
            Dashboard
          </button>
          <button
            className="login-button"
            onClick={()=> setShowLogin(true)}
          >
            Login
          </button>
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
