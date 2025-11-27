// src/pages/ClubDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useClub } from '../context/ClubContext';
import DrinkCard from '../components/DrinkCard';
import './ClubDetails.css';

const ClubDetails = () => {
  const { id } = useParams();
  const { selectedClub, fetchClubById } = useClub();
  const [activeTab, setActiveTab] = useState('drinks');

  useEffect(() => {
    if (id) {
      fetchClubById(id);
    }
  }, [id, fetchClubById]);

  if (!selectedClub) {
    return (
      <div className="club-details-loading">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Loading club details...</p>
      </div>
    );
  }

  return (
    <div className="club-details-page">
      {/* Club Header */}
      <div className="club-header">
        <div className="club-hero">
          <img src={selectedClub.image} alt={selectedClub.name} />
          <div className="club-hero-overlay">
            <div className="container">
              <div className="club-basic-info">
                <h1>{selectedClub.name}</h1>
                <div className="club-meta">
                  <div className="meta-item">
                    <i className="fas fa-star"></i>
                    <span>{selectedClub.rating}</span>
                  </div>
                  <div className="meta-item">
                    <i className="fas fa-location-dot"></i>
                    <span>{selectedClub.distance}</span>
                  </div>
                  <div className="meta-item">
                    <i className="fas fa-tag"></i>
                    <span>{selectedClub.category}</span>
                  </div>
                </div>
                <p className="club-description">{selectedClub.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        {/* Contact Info */}
        <div className="club-contact-info">
          <div className="row">
            <div className="col-md-6">
              <div className="contact-item">
                <i className="fas fa-map-marker-alt"></i>
                <div>
                  <strong>Address</strong>
                  <p>{selectedClub.address}</p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="contact-item">
                <i className="fas fa-phone"></i>
                <div>
                  <strong>Phone</strong>
                  <p>{selectedClub.phone}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Tabs */}
        <div className="menu-section">
          <div className="menu-tabs">
            <button
              className={`menu-tab ${activeTab === 'drinks' ? 'active' : ''}`}
              onClick={() => setActiveTab('drinks')}
            >
              <i className="fas fa-cocktail me-2"></i>
              Drinks ({selectedClub.menu.drinks.length})
            </button>
            <button
              className={`menu-tab ${activeTab === 'food' ? 'active' : ''}`}
              onClick={() => setActiveTab('food')}
            >
              <i className="fas fa-utensils me-2"></i>
              Food ({selectedClub.menu.food.length})
            </button>
          </div>

          <div className="menu-content">
            {activeTab === 'drinks' && (
              <div className="row">
                {selectedClub.menu.drinks.map(drink => (
                  <div key={drink.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                    <DrinkCard item={drink} club={selectedClub} />
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'food' && (
              <div className="row">
                {selectedClub.menu.food.map(food => (
                  <div key={food.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                    <DrinkCard item={food} club={selectedClub} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="reviews-section">
          <h3>Customer Reviews</h3>
          <div className="reviews-grid">
            {selectedClub.reviews.map((review, index) => (
              <div key={index} className="review-card">
                <div className="review-header">
                  <div className="reviewer-info">
                    <div className="reviewer-avatar">
                      {review.user.charAt(0)}
                    </div>
                    <div>
                      <strong>{review.user}</strong>
                      <div className="review-rating">
                        {[...Array(5)].map((_, i) => (
                          <i
                            key={i}
                            className={`fas fa-star ${i < review.rating ? 'active' : ''}`}
                          ></i>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <p className="review-comment">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubDetails;