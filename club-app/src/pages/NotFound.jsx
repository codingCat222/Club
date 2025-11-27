// src/pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-page">
      <div className="container">
        <div className="not-found-content">
          <div className="error-animation">
            <div className="error-icon">
              <i className="fas fa-exclamation-triangle"></i>
            </div>
            <div className="error-404">404</div>
          </div>
          <h1>Page Not Found</h1>
          <p>Sorry, the page you are looking for doesn't exist or has been moved.</p>
          <div className="action-buttons">
            <Link to="/" className="btn btn-primary btn-lg">
              <i className="fas fa-home me-2"></i>
              Go Home
            </Link>
            <Link to="/clubs" className="btn btn-outline-primary btn-lg">
              <i className="fas fa-search-location me-2"></i>
              Explore Clubs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;