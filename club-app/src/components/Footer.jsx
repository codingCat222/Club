// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="footer-brand">
              <i className="fas fa-cocktail me-2"></i>
              ClubSync
            </div>
            <p className="footer-description">
              Revolutionizing nightlife experiences with seamless digital ordering, 
              secure payments, and unforgettable moments.
            </p>
            <div className="social-links">
              <a href="#" className="social-link">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-link">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-link">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="social-link">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
          
          <div className="col-lg-2 col-md-6 mb-4">
            <h5 className="footer-title">Quick Links</h5>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/clubs">Explore Clubs</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          
          <div className="col-lg-3 col-md-6 mb-4">
            <h5 className="footer-title">For Clubs</h5>
            <ul className="footer-links">
              <li><Link to="/register">Join as Club Owner</Link></li>
              <li><Link to="/features">Features</Link></li>
              <li><Link to="/pricing">Pricing</Link></li>
              <li><Link to="/support">Support</Link></li>
            </ul>
          </div>
          
          <div className="col-lg-3 col-md-6 mb-4">
            <h5 className="footer-title">Contact Info</h5>
            <div className="contact-info">
              <div className="contact-item">
                <i className="fas fa-envelope me-2"></i>
                <span>hello@clubsync.com</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-phone me-2"></i>
                <span>+234 (905) 239-8815</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-map-marker-alt me-2"></i>
                <span>5 Lagos State, City</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="row">
            <div className="col-md-6">
              <p className="copyright">
                &copy; 2024 ClubSync. All rights reserved.
              </p>
            </div>
            <div className="col-md-6">
              <div className="footer-bottom-links">
                <Link to="/privacy">Privacy Policy</Link>
                <Link to="/terms">Terms of Service</Link>
                <Link to="/cookies">Cookie Policy</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;