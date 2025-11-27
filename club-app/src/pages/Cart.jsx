// src/pages/Cart.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatMoney } from '../utils/formatMoney';
import './Cart.css';

const Cart = () => {
  const { cartItems, club, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  if (!club || cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="empty-cart">
            <div className="empty-cart-icon">
              <i className="fas fa-shopping-cart"></i>
            </div>
            <h2>Your Cart is Empty</h2>
            <p>Browse our clubs and add some delicious items to get started!</p>
            <Link to="/clubs" className="btn btn-primary btn-lg">
              <i className="fas fa-search-location me-2"></i>
              Explore Clubs
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <div className="cart-header">
          <h1>Your Order</h1>
          <p>Review your items from {club.name}</p>
        </div>

        <div className="row">
          <div className="col-lg-8">
            <div className="cart-items">
              <div className="cart-header-row">
                <span>Item</span>
                <span>Quantity</span>
                <span>Price</span>
                <span>Total</span>
                <span></span>
              </div>
              
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item" data-aos="fade-up">
                  <div className="item-info">
                    <div className="item-image">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="item-details">
                      <h4>{item.name}</h4>
                      <p className="item-category">{item.category}</p>
                    </div>
                  </div>
                  
                  <div className="quantity-controls">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="quantity-btn"
                    >
                      <i className="fas fa-minus"></i>
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="quantity-btn"
                    >
                      <i className="fas fa-plus"></i>
                    </button>
                  </div>
                  
                  <div className="item-price">
                    {formatMoney(item.price)}
                  </div>
                  
                  <div className="item-total">
                    {formatMoney(item.price * item.quantity)}
                  </div>
                  
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="remove-btn"
                    title="Remove item"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-actions">
              <button onClick={clearCart} className="btn btn-outline-danger">
                <i className="fas fa-trash me-2"></i>
                Clear Cart
              </button>
              <Link to="/clubs" className="btn btn-outline-primary">
                <i className="fas fa-plus me-2"></i>
                Add More Items
              </Link>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="cart-summary" data-aos="fade-left">
              <div className="summary-header">
                <h3>Order Summary</h3>
              </div>
              
              <div className="summary-content">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>{formatMoney(getCartTotal())}</span>
                </div>
                <div className="summary-row">
                  <span>Service Fee</span>
                  <span>{formatMoney(2.99)}</span>
                </div>
                <div className="summary-row">
                  <span>Tax</span>
                  <span>{formatMoney(getCartTotal() * 0.08)}</span>
                </div>
                <div className="summary-divider"></div>
                <div className="summary-row total">
                  <span>Total</span>
                  <span>{formatMoney(getCartTotal() + 2.99 + (getCartTotal() * 0.08))}</span>
                </div>
              </div>

              <div className="summary-footer">
                <button
                  onClick={() => navigate('/checkout')}
                  className="btn btn-primary btn-lg w-100 checkout-btn"
                >
                  <i className="fas fa-lock me-2"></i>
                  Proceed to Checkout
                </button>
                
                <div className="security-badge">
                  <i className="fas fa-shield-alt"></i>
                  <span>Secure SSL Encryption</span>
                </div>
              </div>
            </div>

            <div className="club-info-card">
              <div className="club-header">
                <img src={club.image} alt={club.name} />
                <div className="club-details">
                  <h5>{club.name}</h5>
                  <div className="club-rating">
                    <i className="fas fa-star"></i>
                    <span>{club.rating}</span>
                  </div>
                </div>
              </div>
              <div className="club-contact">
                <div className="contact-item">
                  <i className="fas fa-location-dot"></i>
                  <span>{club.address}</span>
                </div>
                <div className="contact-item">
                  <i className="fas fa-phone"></i>
                  <span>{club.phone}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;