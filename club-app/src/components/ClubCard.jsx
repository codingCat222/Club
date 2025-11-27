// src/components/ClubCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './ClubCard.css';

const ClubCard = ({ club }) => {
  return (
    <div className="club-card card card-hover">
      <div className="club-image">
        <img src={club.image} alt={club.name} className="card-img-top" />
        <div className="club-overlay">
          <div className="club-rating">
            <i className="fas fa-star"></i>
            <span>{club.rating}</span>
          </div>
          <div className="club-distance">
            <i className="fas fa-location-dot"></i>
            <span>{club.distance}</span>
          </div>
        </div>
      </div>
      
      <div className="card-body">
        <div className="club-category">
          <span className="category-badge">{club.category}</span>
        </div>
        
        <h5 className="club-name">{club.name}</h5>
        <p className="club-description">{club.description}</p>
        
        <div className="club-features">
          <div className="feature">
            <i className="fas fa-cocktail"></i>
            <span>{club.menu.drinks.length} Drinks</span>
          </div>
          <div className="feature">
            <i className="fas fa-utensils"></i>
            <span>{club.menu.food.length} Food Items</span>
          </div>
        </div>
        
        <div className="club-actions">
          <Link to={`/club/${club.id}`} className="btn btn-primary btn-sm">
            <i className="fas fa-eye me-1"></i>
            View Club
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ClubCard;