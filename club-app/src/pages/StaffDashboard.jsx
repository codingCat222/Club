// src/pages/StaffDashboard.jsx
import React, { useState, useEffect } from 'react';
import './StaffDashboard.css';

const StaffDashboard = () => {
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({});
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    // Mock data
    const mockOrders = [
      {
        id: 'ORD-123456',
        customer: 'John Doe',
        items: [
          { name: 'Signature Mojito', quantity: 2 },
          { name: 'Chicken Wings', quantity: 1 }
        ],
        total: 36,
        status: 'ready',
        time: '2 min ago'
      },
      {
        id: 'ORD-123457',
        customer: 'Sarah Smith',
        items: [
          { name: 'Whiskey Sour', quantity: 1 },
          { name: 'Truffle Fries', quantity: 1 }
        ],
        total: 26,
        status: 'preparing',
        time: '5 min ago'
      },
      {
        id: 'ORD-123458',
        customer: 'Mike Johnson',
        items: [
          { name: 'Craft Beer', quantity: 3 }
        ],
        total: 24,
        status: 'pending',
        time: '8 min ago'
      }
    ];

    const mockStats = {
      completed: 12,
      pending: 3,
      revenue: 450,
      rating: 4.8
    };

    setOrders(mockOrders);
    setStats(mockStats);
  }, []);

  const handleStatusUpdate = (orderId, newStatus) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const handleScanQR = () => {
    setScanning(true);
    // Simulate QR scanning
    setTimeout(() => {
      setScanning(false);
      alert('QR Code scanned successfully! Order verified.');
    }, 2000);
  };

  const getOrdersByStatus = (status) => {
    return orders.filter(order => order.status === status);
  };

  return (
    <div className="staff-dashboard">
      <div className="container">
        <div className="dashboard-header">
          <div className="header-content">
            <h1>Staff Dashboard</h1>
            <p>Manage orders and provide excellent service</p>
          </div>
          <div className="header-actions">
            <button 
              className="btn btn-primary"
              onClick={handleScanQR}
              disabled={scanning}
            >
              <i className="fas fa-qrcode me-2"></i>
              {scanning ? 'Scanning...' : 'Scan QR Code'}
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="stats-overview">
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <div className="stat-card completed">
                <div className="stat-icon">
                  <i className="fas fa-check-circle"></i>
                </div>
                <div className="stat-info">
                  <span className="stat-number">{stats.completed}</span>
                  <span className="stat-label">Completed Today</span>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="stat-card pending">
                <div className="stat-icon">
                  <i className="fas fa-clock"></i>
                </div>
                <div className="stat-info">
                  <span className="stat-number">{stats.pending}</span>
                  <span className="stat-label">Pending Orders</span>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="stat-card revenue">
                <div className="stat-icon">
                  <i className="fas fa-dollar-sign"></i>
                </div>
                <div className="stat-info">
                  <span className="stat-number">${stats.revenue}</span>
                  <span className="stat-label">Today's Revenue</span>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="stat-card rating">
                <div className="stat-icon">
                  <i className="fas fa-star"></i>
                </div>
                <div className="stat-info">
                  <span className="stat-number">{stats.rating}</span>
                  <span className="stat-label">Average Rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Orders Management */}
        <div className="orders-management">
          <div className="management-header">
            <h2>Order Management</h2>
            <div className="status-tabs">
              {['all', 'pending', 'preparing', 'ready'].map(status => (
                <button
                  key={status}
                  className={`status-tab ${activeTab === status ? 'active' : ''}`}
                  onClick={() => setActiveTab(status)}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                  <span className="tab-count">
                    {status === 'all' ? orders.length : getOrdersByStatus(status).length}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="orders-grid">
            {(activeTab === 'all' ? orders : getOrdersByStatus(activeTab)).map((order, index) => (
              <div key={order.id} className="order-card" data-aos="fade-up" data-aos-delay={index * 100}>
                <div className="order-header">
                  <div className="order-info">
                    <h4>Order #{order.id}</h4>
                    <span className="customer">{order.customer}</span>
                  </div>
                  <div className={`status-badge status-${order.status}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </div>
                </div>

                <div className="order-items">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="order-item">
                      <span className="item-name">{item.name}</span>
                      <span className="item-quantity">x{item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="order-footer">
                  <div className="order-total">
                    <strong>${order.total}</strong>
                    <span className="order-time">{order.time}</span>
                  </div>
                  <div className="order-actions">
                    {order.status === 'pending' && (
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => handleStatusUpdate(order.id, 'preparing')}
                      >
                        Start Preparing
                      </button>
                    )}
                    {order.status === 'preparing' && (
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => handleStatusUpdate(order.id, 'ready')}
                      >
                        Mark Ready
                      </button>
                    )}
                    {order.status === 'ready' && (
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => handleStatusUpdate(order.id, 'completed')}
                      >
                        Complete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {getOrdersByStatus(activeTab).length === 0 && (
            <div className="no-orders">
              <i className="fas fa-clipboard-list"></i>
              <h3>No {activeTab} orders</h3>
              <p>All caught up! New orders will appear here.</p>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <h3>Quick Actions</h3>
          <div className="actions-grid">
            <button className="action-card">
              <i className="fas fa-qrcode"></i>
              <span>Scan QR Code</span>
            </button>
            <button className="action-card">
              <i className="fas fa-utensils"></i>
              <span>Kitchen View</span>
            </button>
            <button className="action-card">
              <i className="fas fa-chart-line"></i>
              <span>Today's Report</span>
            </button>
            <button className="action-card">
              <i className="fas fa-cog"></i>
              <span>Settings</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;