// src/pages/Orders.jsx
import React, { useState, useEffect } from 'react';
import OrderCard from '../components/OrderCard';
import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockOrders = [
        {
          id: 'ORD-123456',
          date: '2024-01-15 20:30',
          status: 'completed',
          clubName: 'Neon Lounge',
          items: [
            { name: 'Signature Mojito', quantity: 2, price: 12 },
            { name: 'Truffle Fries', quantity: 1, price: 12 }
          ],
          total: 36
        },
        {
          id: 'ORD-123457',
          date: '2024-01-14 22:15',
          status: 'completed',
          clubName: 'Sky Bar',
          items: [
            { name: 'Skyline Martini', quantity: 1, price: 16 },
            { name: 'Beef Sliders', quantity: 1, price: 18 }
          ],
          total: 34
        },
        {
          id: 'ORD-123458',
          date: '2024-01-13 21:45',
          status: 'cancelled',
          clubName: 'Neon Lounge',
          items: [
            { name: 'Craft Beer', quantity: 3, price: 8 }
          ],
          total: 24
        }
      ];
      setOrders(mockOrders);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true;
    return order.status === filter;
  });

  const statusCounts = {
    all: orders.length,
    completed: orders.filter(o => o.status === 'completed').length,
    preparing: orders.filter(o => o.status === 'preparing').length,
    ready: orders.filter(o => o.status === 'ready').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length
  };

  if (loading) {
    return (
      <div className="orders-loading">
        <div className="loading-spinner"></div>
        <p>Loading your orders...</p>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <div className="container">
        <div className="orders-header">
          <div className="header-content">
            <h1>Order History</h1>
            <p>Track and manage all your orders in one place</p>
          </div>
          <div className="header-stats">
            <div className="stat-card">
              <div className="stat-icon completed">
                <i className="fas fa-check-circle"></i>
              </div>
              <div className="stat-info">
                <span className="stat-number">{statusCounts.completed}</span>
                <span className="stat-label">Completed</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon total">
                <i className="fas fa-receipt"></i>
              </div>
              <div className="stat-info">
                <span className="stat-number">{statusCounts.all}</span>
                <span className="stat-label">Total Orders</span>
              </div>
            </div>
          </div>
        </div>

        <div className="orders-filters">
          <div className="filter-tabs">
            {[
              { key: 'all', label: 'All Orders', icon: 'fas fa-list' },
              { key: 'completed', label: 'Completed', icon: 'fas fa-check' },
              { key: 'preparing', label: 'Preparing', icon: 'fas fa-utensils' },
              { key: 'ready', label: 'Ready', icon: 'fas fa-box' },
              { key: 'cancelled', label: 'Cancelled', icon: 'fas fa-times' }
            ].map(tab => (
              <button
                key={tab.key}
                className={`filter-tab ${filter === tab.key ? 'active' : ''}`}
                onClick={() => setFilter(tab.key)}
              >
                <i className={tab.icon}></i>
                {tab.label}
                {statusCounts[tab.key] > 0 && (
                  <span className="tab-badge">{statusCounts[tab.key]}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="orders-content">
          {filteredOrders.length > 0 ? (
            <div className="orders-grid">
              {filteredOrders.map((order, index) => (
                <div key={order.id} data-aos="fade-up" data-aos-delay={index * 100}>
                  <OrderCard order={order} />
                </div>
              ))}
            </div>
          ) : (
            <div className="no-orders">
              <div className="no-orders-icon">
                <i className="fas fa-clipboard-list"></i>
              </div>
              <h3>No orders found</h3>
              <p>
                {filter === 'all' 
                  ? "You haven't placed any orders yet."
                  : `You don't have any ${filter} orders.`
                }
              </p>
              {filter !== 'all' && (
                <button
                  className="btn btn-primary"
                  onClick={() => setFilter('all')}
                >
                  View All Orders
                </button>
              )}
            </div>
          )}
        </div>

        {filteredOrders.length > 0 && (
          <div className="orders-summary">
            <div className="summary-card">
              <h4>Order Statistics</h4>
              <div className="stats-grid">
                <div className="stat-item">
                  <span className="stat-value">{orders.length}</span>
                  <span className="stat-label">Total Orders</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">
                    ${orders.reduce((total, order) => total + order.total, 0).toFixed(2)}
                  </span>
                  <span className="stat-label">Total Spent</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">
                    {Math.round(orders.reduce((total, order) => total + order.total, 0) / orders.length) || 0}
                  </span>
                  <span className="stat-label">Avg. Order Value</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;