// src/pages/Checkout.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { formatMoney } from '../utils/formatMoney';
import Input from '../components/Input';
import Button from '../components/Button';
import './Checkout.css';

const Checkout = () => {
  const { cartItems, club, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    saveCard: false
  });

  const subtotal = getCartTotal();
  const serviceFee = 2.99;
  const tax = subtotal * 0.08;
  const total = subtotal + serviceFee + tax;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate payment processing
    setTimeout(() => {
      const orderId = `ORD-${Date.now()}`;
      clearCart();
      navigate(`/qr-code/${orderId}`);
      setLoading(false);
    }, 2000);
  };

  if (!club || cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <div className="checkout-header">
          <h1>Checkout</h1>
          <p>Complete your order from {club.name}</p>
        </div>

        <div className="row">
          <div className="col-lg-8">
            <div className="checkout-card">
              <div className="checkout-tabs">
                <div className="checkout-tab active">
                  <i className="fas fa-credit-card me-2"></i>
                  Payment Method
                </div>
              </div>

              <form onSubmit={handleSubmit} className="payment-form">
                <div className="payment-methods">
                  <div className="payment-method">
                    <input
                      type="radio"
                      id="card"
                      name="paymentMethod"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                    />
                    <label htmlFor="card">
                      <i className="fab fa-cc-visa"></i>
                      Credit/Debit Card
                    </label>
                  </div>
                  <div className="payment-method">
                    <input
                      type="radio"
                      id="paypal"
                      name="paymentMethod"
                      checked={paymentMethod === 'paypal'}
                      onChange={() => setPaymentMethod('paypal')}
                    />
                    <label htmlFor="paypal">
                      <i className="fab fa-paypal"></i>
                      PayPal
                    </label>
                  </div>
                </div>

                {paymentMethod === 'card' && (
                  <div className="card-form" data-aos="fade-up">
                    <div className="row">
                      <div className="col-md-12">
                        <Input
                          label="Cardholder Name"
                          name="cardholderName"
                          value={formData.cardholderName}
                          onChange={handleInputChange}
                          placeholder="Enter cardholder name"
                          required
                          icon="fas fa-user"
                        />
                      </div>
                    </div>
                    
                    <div className="row">
                      <div className="col-md-8">
                        <Input
                          label="Card Number"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          placeholder="1234 5678 9012 3456"
                          required
                          icon="fas fa-credit-card"
                          maxLength="19"
                        />
                      </div>
                      <div className="col-md-2">
                        <Input
                          label="Expiry"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          placeholder="MM/YY"
                          required
                          maxLength="5"
                        />
                      </div>
                      <div className="col-md-2">
                        <Input
                          label="CVV"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          placeholder="123"
                          required
                          maxLength="3"
                        />
                      </div>
                    </div>

                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="saveCard"
                        name="saveCard"
                        checked={formData.saveCard}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label" htmlFor="saveCard">
                        Save card for future payments
                      </label>
                    </div>
                  </div>
                )}

                {paymentMethod === 'paypal' && (
                  <div className="paypal-info" data-aos="fade-up">
                    <div className="paypal-logo">
                      <i className="fab fa-paypal fa-3x"></i>
                    </div>
                    <p>You will be redirected to PayPal to complete your payment securely.</p>
                  </div>
                )}

                <div className="order-notes">
                  <label>Special Instructions (Optional)</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    placeholder="Any special requests or instructions for your order..."
                  ></textarea>
                </div>

                <div className="checkout-actions">
                  <Button
                    type="submit"
                    variant="primary"
                    size="large"
                    loading={loading}
                    className="place-order-btn"
                  >
                    {loading ? (
                      <>
                        <i className="fas fa-spinner fa-spin me-2"></i>
                        Processing Payment...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-lock me-2"></i>
                        Place Order - {formatMoney(total)}
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="order-summary" data-aos="fade-left">
              <div className="summary-header">
                <h3>Order Summary</h3>
              </div>

              <div className="order-items-preview">
                {cartItems.map(item => (
                  <div key={item.id} className="order-item-preview">
                    <div className="item-info">
                      <span className="item-name">{item.name}</span>
                      <span className="item-quantity">x{item.quantity}</span>
                    </div>
                    <span className="item-price">
                      {formatMoney(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="price-breakdown">
                <div className="price-row">
                  <span>Subtotal</span>
                  <span>{formatMoney(subtotal)}</span>
                </div>
                <div className="price-row">
                  <span>Service Fee</span>
                  <span>{formatMoney(serviceFee)}</span>
                </div>
                <div className="price-row">
                  <span>Tax</span>
                  <span>{formatMoney(tax)}</span>
                </div>
                <div className="price-divider"></div>
                <div className="price-row total">
                  <span>Total</span>
                  <span>{formatMoney(total)}</span>
                </div>
              </div>

              <div className="club-info">
                <div className="club-image">
                  <img src={club.image} alt={club.name} />
                </div>
                <div className="club-details">
                  <h5>{club.name}</h5>
                  <p>{club.address}</p>
                </div>
              </div>
            </div>

            <div className="security-features">
              <div className="security-item">
                <i className="fas fa-shield-alt"></i>
                <div>
                  <strong>SSL Secure Payment</strong>
                  <span>256-bit encryption</span>
                </div>
              </div>
              <div className="security-item">
                <i className="fas fa-lock"></i>
                <div>
                  <strong>Payment Protection</strong>
                  <span>Chargeback guaranteed</span>
                </div>
              </div>
              <div className="security-item">
                <i className="fas fa-clock"></i>
                <div>
                  <strong>Instant Confirmation</strong>
                  <span>QR code ready in seconds</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;