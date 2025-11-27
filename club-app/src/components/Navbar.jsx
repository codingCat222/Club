// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { getCartItemsCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const isActiveLink = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        {/* Logo */}
        <Link className="nav-logo" to="/">
          <div className="nav-logo" style={{ marginRight: 'auto', marginLeft: '0', position: 'absolute', left: '2rem' }}>
  <div className="logo-icon">
    <i className="fas fa-cocktail"></i>
  </div>
  <span className="logo-text">ClubSync</span>
</div>
        </Link>

        {/* Desktop Navigation */}
        <div className="nav-menu">
          <Link 
            className={`nav-link ${isActiveLink('/')}`} 
            to="/"
          >
            <i className="fas fa-home"></i>
            <span>Home</span>
          </Link>
          
          <Link 
            className={`nav-link ${isActiveLink('/clubs')}`} 
            to="/clubs"
          >
            <i className="fas fa-search-location"></i>
            <span>Explore</span>
          </Link>

          {user && user.role === 'user' && (
            <Link 
              className={`nav-link ${isActiveLink('/cart')}`} 
              to="/cart"
            >
              <div className="cart-wrapper">
                <i className="fas fa-shopping-cart"></i>
                {getCartItemsCount() > 0 && (
                  <span className="cart-badge">{getCartItemsCount()}</span>
                )}
              </div>
              <span>Cart</span>
            </Link>
          )}
        </div>

        {/* User Section */}
        <div className="nav-user">
          {user ? (
            <div className="user-menu">
              <div className="user-info">
                <div className="user-avatar">
                  {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <span className="user-name">{user.name}</span>
                <i className="fas fa-chevron-down"></i>
              </div>
              
              <div className="user-dropdown">
                <div className="dropdown-section">
                  <div className="user-email">{user.email}</div>
                  <div className={`user-role ${user.role}`}>
                    {user.role.replace('_', ' ')}
                  </div>
                </div>
                
                <div className="dropdown-section">
                  <Link 
                    className="dropdown-item" 
                    to="/profile"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <i className="fas fa-user"></i>
                    <span>Profile</span>
                  </Link>
                  
                  {user.role === 'user' && (
                    <Link 
                      className="dropdown-item" 
                      to="/orders"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <i className="fas fa-history"></i>
                      <span>Orders</span>
                    </Link>
                  )}
                  
                  {(user.role === 'club_owner' || user.role === 'admin') && (
                    <Link 
                      className="dropdown-item" 
                      to="/owner/dashboard"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <i className="fas fa-chart-line"></i>
                      <span>Dashboard</span>
                    </Link>
                  )}
                  
                  {user.role === 'staff' && (
                    <Link 
                      className="dropdown-item" 
                      to="/staff/dashboard"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <i className="fas fa-concierge-bell"></i>
                      <span>Staff Panel</span>
                    </Link>
                  )}
                </div>
                
                <div className="dropdown-section">
                  <button 
                    className="dropdown-item logout-btn" 
                    onClick={handleLogout}
                  >
                    <i className="fas fa-sign-out-alt"></i>
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link 
                className="nav-link" 
                to="/login"
              >
                <i className="fas fa-sign-in-alt"></i>
                <span>Login</span>
              </Link>
              <Link 
                className="nav-btn primary" 
                to="/register"
              >
                <span>Sign Up</span>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <Link 
          className={`mobile-link ${isActiveLink('/')}`} 
          to="/"
          onClick={() => setIsMenuOpen(false)}
        >
          <i className="fas fa-home"></i>
          <span>Home</span>
        </Link>
        
        <Link 
          className={`mobile-link ${isActiveLink('/clubs')}`} 
          to="/clubs"
          onClick={() => setIsMenuOpen(false)}
        >
          <i className="fas fa-search-location"></i>
          <span>Explore Clubs</span>
        </Link>

        {user && user.role === 'user' && (
          <Link 
            className={`mobile-link ${isActiveLink('/cart')}`} 
            to="/cart"
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="cart-wrapper">
              <i className="fas fa-shopping-cart"></i>
              {getCartItemsCount() > 0 && (
                <span className="cart-badge">{getCartItemsCount()}</span>
              )}
            </div>
            <span>Cart</span>
          </Link>
        )}

        {user ? (
          <>
            <Link 
              className="mobile-link" 
              to="/profile"
              onClick={() => setIsMenuOpen(false)}
            >
              <i className="fas fa-user"></i>
              <span>Profile</span>
            </Link>
            
            {user.role === 'user' && (
              <Link 
                className="mobile-link" 
                to="/orders"
                onClick={() => setIsMenuOpen(false)}
              >
                <i className="fas fa-history"></i>
                <span>Orders</span>
              </Link>
            )}
            
            <button 
              className="mobile-link logout-btn" 
              onClick={handleLogout}
            >
              <i className="fas fa-sign-out-alt"></i>
              <span>Logout</span>
            </button>
          </>
        ) : (
          <>
            <Link 
              className="mobile-link" 
              to="/login"
              onClick={() => setIsMenuOpen(false)}
            >
              <i className="fas fa-sign-in-alt"></i>
              <span>Login</span>
            </Link>
            <Link 
              className="mobile-link" 
              to="/register"
              onClick={() => setIsMenuOpen(false)}
            >
              <i className="fas fa-user-plus"></i>
              <span>Sign Up</span>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;