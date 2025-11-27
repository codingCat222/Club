// src/components/OrderCard.jsx
import React from 'react';
import './OrderCard.css';

const OrderCard = ({ order }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'success';
      case 'preparing': return 'warning';
      case 'ready': return 'info';
      case 'cancelled': return 'error';
      default: return 'secondary';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return 'fa-check-circle';
      case 'preparing': return 'fa-utensils';
      case 'ready': return 'fa-box';
      case 'cancelled': return 'fa-times-circle';
      default: return 'fa-clock';
    }
  };

  return (
    <div className="order-card card card-hover">
      <div className="card-body">
        <div className="order-header">
          <div className="order-info">
            <h6 className="order-id">Order #{order.id}</h6>
            <span className="order-date">{order.date}</span>
          </div>
          <div className={`status-badge status-${getStatusColor(order.status)}`}>
            <i className={`fas ${getStatusIcon(order.status)} me-1`}></i>
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </div>
        </div>
        
        <div className="order-club">
          <i className="fas fa-store me-2"></i>
          {order.clubName}
        </div>
        
        <div className="order-items">
          {order.items.map((item, index) => (
            <div key={index} className="order-item">
              <span className="item-name">{item.name}</span>
              <span className="item-quantity">x{item.quantity}</span>
              <span className="item-price">${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
        
        <div className="order-footer">
          <div className="order-total">
            <strong>Total: ${order.total.toFixed(2)}</strong>
          </div>
          <div className="order-actions">
            {order.status === 'ready' && (
              <button className="btn btn-primary btn-sm">
                <i className="fas fa-qrcode me-1"></i>
                Show QR
              </button>
            )}
            {order.status === 'completed' && (
              <button className="btn btn-outline-primary btn-sm">
                <i className="fas fa-redo me-1"></i>
                Reorder
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;