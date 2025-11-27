// src/components/DrinkCard.jsx
import React from 'react';
import { useCart } from '../context/CartContext';
import './DrinkCard.css';

const DrinkCard = ({ item, club }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(item, club);
  };

  return (
    <div className="drink-card card card-hover">
      <div className="drink-image">
        <img src={item.image} alt={item.name} />
        <div className="drink-overlay">
          <button 
            className="btn btn-primary btn-add-to-cart"
            onClick={handleAddToCart}
          >
            <i className="fas fa-plus"></i>
            Add to Cart
          </button>
        </div>
      </div>
      
      <div className="card-body">
        <div className="drink-info">
          <h6 className="drink-name">{item.name}</h6>
          <p className="drink-category">{item.category}</p>
          <div className="drink-price">
            ${item.price}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrinkCard;