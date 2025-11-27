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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
    setIsMobileMenuOpen(false);
  };

  const isActiveLink = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  // Close mobile menu when clicking on overlay
  const handleOverlayClick = () => {
    setIsMobileMenuOpen(false);
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          {/* Logo */}
          <Link className="nav-logo" to="/">
            <div className="logo-icon">
              <i className="fas fa-cocktail"></i>
            </div>
            <span className="logo-text">ClubSync</span>
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
                    >
                      <i className="fas fa-user"></i>
                      <span>Profile</span>
                    </Link>
                    
                    {user.role === 'user' && (
                      <Link 
                        className="dropdown-item" 
                        to="/orders"
                      >
                        <i className="fas fa-history"></i>
                        <span>Orders</span>
                      </Link>
                    )}
                    
                    {(user.role === 'club_owner' || user.role === 'admin') && (
                      <Link 
                        className="dropdown-item" 
                        to="/owner/dashboard"
                      >
                        <i className="fas fa-chart-line"></i>
                        <span>Dashboard</span>
                      </Link>
                    )}
                    
                    {user.role === 'staff' && (
                      <Link 
                        className="dropdown-item" 
                        to="/staff/dashboard"
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
            className={`mobile-menu-btn ${isMobileMenuOpen ? 'open' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`}
        onClick={handleOverlayClick}
      />

      {/* Mobile Menu - Left Edge */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        {/* Mobile Menu Header */}
        <div className="mobile-menu-header">
          <div className="mobile-user-info">
            <div className="mobile-user-avatar">
              {user ? (user.name ? user.name.charAt(0).toUpperCase() : 'U') : 'G'}
            </div>
            <div className="mobile-user-details">
              <div className="mobile-user-name">
                {user ? user.name : 'Guest'}
              </div>
              <div className="mobile-user-email">
                {user ? user.email : 'Welcome to ClubSync'}
              </div>
            </div>
          </div>
          <button 
            className="mobile-close-btn"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            ×
          </button>
        </div>
        
        {/* Navigation Links */}
        <Link 
          className={`mobile-link ${isActiveLink('/')}`} 
          to="/"
        >
          <i className="fas fa-home"></i>
          <span>Home</span>
        </Link>
        
        <Link 
          className={`mobile-link ${isActiveLink('/clubs')}`} 
          to="/clubs"
        >
          <i className="fas fa-search-location"></i>
          <span>Explore Clubs</span>
        </Link>

        {user && user.role === 'user' && (
          <Link 
            className={`mobile-link ${isActiveLink('/cart')}`} 
            to="/cart"
          >
            <i className="fas fa-shopping-cart"></i>
            <span>Cart</span>
            {getCartItemsCount() > 0 && (
              <span className="mobile-cart-badge">{getCartItemsCount()}</span>
            )}
          </Link>
        )}

        {user ? (
          <>
            <Link 
              className={`mobile-link ${isActiveLink('/profile')}`} 
              to="/profile"
            >
              <i className="fas fa-user"></i>
              <span>Profile</span>
            </Link>
            
            {user.role === 'user' && (
              <Link 
                className={`mobile-link ${isActiveLink('/orders')}`} 
                to="/orders"
              >
                <i className="fas fa-history"></i>
                <span>Orders</span>
              </Link>
            )}
            
            {(user.role === 'club_owner' || user.role === 'admin') && (
              <Link 
                className={`mobile-link ${isActiveLink('/owner/dashboard')}`} 
                to="/owner/dashboard"
              >
                <i className="fas fa-chart-line"></i>
                <span>Dashboard</span>
              </Link>
            )}
            
            {user.role === 'staff' && (
              <Link 
                className={`mobile-link ${isActiveLink('/staff/dashboard')}`} 
                to="/staff/dashboard"
              >
                <i className="fas fa-concierge-bell"></i>
                <span>Staff Panel</span>
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
              className={`mobile-link ${isActiveLink('/login')}`} 
              to="/login"
            >
              <i className="fas fa-sign-in-alt"></i>
              <span>Login</span>
            </Link>
            <Link 
              className={`mobile-link ${isActiveLink('/register')}`} 
              to="/register"
            >
              <i className="fas fa-user-plus"></i>
              <span>Sign Up</span>
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default Navbar;