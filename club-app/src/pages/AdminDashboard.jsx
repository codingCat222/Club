// src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({});
  const [clubs, setClubs] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Mock data
    const mockStats = {
      totalUsers: 1250,
      totalClubs: 45,
      totalRevenue: 12500,
      activeOrders: 23,
      growth: 15.5
    };

    const mockClubs = [
      {
        id: 1,
        name: 'Neon Lounge',
        status: 'verified',
        revenue: 3200,
        orders: 45,
        rating: 4.5
      },
      {
        id: 2,
        name: 'Sky Bar',
        status: 'verified',
        revenue: 2800,
        orders: 38,
        rating: 4.8
      },
      {
        id: 3,
        name: 'Electric Club',
        status: 'pending',
        revenue: 0,
        orders: 0,
        rating: 0
      }
    ];

    const mockUsers = [
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        role: 'user',
        joinDate: '2024-01-15',
        orders: 12
      },
      {
        id: 2,
        name: 'Sarah Smith',
        email: 'sarah@example.com',
        role: 'club_owner',
        joinDate: '2024-01-10',
        orders: 0
      }
    ];

    setStats(mockStats);
    setClubs(mockClubs);
    setUsers(mockUsers);
  }, []);

  const handleClubAction = (clubId, action) => {
    if (action === 'verify') {
      setClubs(prev => prev.map(club => 
        club.id === clubId ? { ...club, status: 'verified' } : club
      ));
    } else if (action === 'suspend') {
      setClubs(prev => prev.map(club => 
        club.id === clubId ? { ...club, status: 'suspended' } : club
      ));
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1>Admin Dashboard</h1>
          <p>Manage the entire ClubSync platform</p>
        </div>

        {/* Stats Overview */}
        <div className="stats-overview">
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <div className="stat-card users">
                <div className="stat-icon">
                  <i className="fas fa-users"></i>
                </div>
                <div className="stat-info">
                  <span className="stat-number">{stats.totalUsers}</span>
                  <span className="stat-label">Total Users</span>
                  <span className="stat-growth positive">
                    <i className="fas fa-arrow-up"></i>
                    {stats.growth}%
                  </span>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="stat-card clubs">
                <div className="stat-icon">
                  <i className="fas fa-store"></i>
                </div>
                <div className="stat-info">
                  <span className="stat-number">{stats.totalClubs}</span>
                  <span className="stat-label">Partner Clubs</span>
                  <span className="stat-growth positive">
                    <i className="fas fa-arrow-up"></i>
                    8.2%
                  </span>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="stat-card revenue">
                <div className="stat-icon">
                  <i className="fas fa-dollar-sign"></i>
                </div>
                <div className="stat-info">
                  <span className="stat-number">${stats.totalRevenue}</span>
                  <span className="stat-label">Total Revenue</span>
                  <span className="stat-growth positive">
                    <i className="fas fa-arrow-up"></i>
                    12.3%
                  </span>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="stat-card orders">
                <div className="stat-icon">
                  <i className="fas fa-shopping-cart"></i>
                </div>
                <div className="stat-info">
                  <span className="stat-number">{stats.activeOrders}</span>
                  <span className="stat-label">Active Orders</span>
                  <span className="stat-growth positive">
                    <i className="fas fa-arrow-up"></i>
                    5.7%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="admin-navigation">
          <div className="nav-tabs">
            {[
              { key: 'overview', label: 'Overview', icon: 'fas fa-chart-pie' },
              { key: 'clubs', label: 'Clubs', icon: 'fas fa-store' },
              { key: 'users', label: 'Users', icon: 'fas fa-users' },
              { key: 'reports', label: 'Reports', icon: 'fas fa-chart-line' },
              { key: 'settings', label: 'Settings', icon: 'fas fa-cog' }
            ].map(tab => (
              <button
                key={tab.key}
                className={`nav-tab ${activeTab === tab.key ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.key)}
              >
                <i className={tab.icon}></i>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === 'overview' && (
            <div className="tab-pane">
              <div className="row">
                <div className="col-lg-8">
                  <div className="chart-card">
                    <div className="card-header">
                      <h3>Revenue Overview</h3>
                      <select className="form-select period-select">
                        <option>Last 7 days</option>
                        <option>Last 30 days</option>
                        <option>Last 90 days</option>
                      </select>
                    </div>
                    <div className="chart-placeholder">
                      <i className="fas fa-chart-bar"></i>
                      <p>Revenue chart visualization</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="quick-stats">
                    <h4>Quick Stats</h4>
                    <div className="stat-items">
                      <div className="stat-item">
                        <span className="label">New Users Today</span>
                        <span className="value">24</span>
                      </div>
                      <div className="stat-item">
                        <span className="label">Orders Today</span>
                        <span className="value">156</span>
                      </div>
                      <div className="stat-item">
                        <span className="label">Avg. Order Value</span>
                        <span className="value">$32.50</span>
                      </div>
                      <div className="stat-item">
                        <span className="label">Support Tickets</span>
                        <span className="value">8</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'clubs' && (
            <div className="tab-pane">
              <div className="clubs-management">
                <div className="section-header">
                  <h3>Club Management</h3>
                  <button className="btn btn-primary">
                    <i className="fas fa-plus me-2"></i>
                    Add New Club
                  </button>
                </div>
                
                <div className="clubs-table">
                  <div className="table-header">
                    <span>Club Name</span>
                    <span>Status</span>
                    <span>Revenue</span>
                    <span>Orders</span>
                    <span>Rating</span>
                    <span>Actions</span>
                  </div>
                  
                  {clubs.map(club => (
                    <div key={club.id} className="table-row">
                      <div className="club-info">
                        <span className="club-name">{club.name}</span>
                      </div>
                      <div className="club-status">
                        <span className={`status-badge status-${club.status}`}>
                          {club.status}
                        </span>
                      </div>
                      <div className="club-revenue">
                        ${club.revenue}
                      </div>
                      <div className="club-orders">
                        {club.orders}
                      </div>
                      <div className="club-rating">
                        {club.rating > 0 ? (
                          <>
                            <i className="fas fa-star"></i>
                            {club.rating}
                          </>
                        ) : (
                          'N/A'
                        )}
                      </div>
                      <div className="club-actions">
                        {club.status === 'pending' && (
                          <button
                            className="btn btn-success btn-sm"
                            onClick={() => handleClubAction(club.id, 'verify')}
                          >
                            Verify
                          </button>
                        )}
                        {club.status === 'verified' && (
                          <button
                            className="btn btn-warning btn-sm"
                            onClick={() => handleClubAction(club.id, 'suspend')}
                          >
                            Suspend
                          </button>
                        )}
                        <button className="btn btn-outline-primary btn-sm">
                          View
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="tab-pane">
              <div className="users-management">
                <div className="section-header">
                  <h3>User Management</h3>
                  <div className="search-box">
                    <i className="fas fa-search"></i>
                    <input type="text" placeholder="Search users..." />
                  </div>
                </div>
                
                <div className="users-table">
                  <div className="table-header">
                    <span>User</span>
                    <span>Role</span>
                    <span>Join Date</span>
                    <span>Orders</span>
                    <span>Actions</span>
                  </div>
                  
                  {users.map(user => (
                    <div key={user.id} className="table-row">
                      <div className="user-info">
                        <div className="user-avatar">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <span className="user-name">{user.name}</span>
                          <span className="user-email">{user.email}</span>
                        </div>
                      </div>
                      <div className="user-role">
                        <span className={`role-badge role-${user.role}`}>
                          {user.role.replace('_', ' ')}
                        </span>
                      </div>
                      <div className="user-join-date">
                        {new Date(user.joinDate).toLocaleDateString()}
                      </div>
                      <div className="user-orders">
                        {user.orders}
                      </div>
                      <div className="user-actions">
                        <button className="btn btn-outline-primary btn-sm">
                          Edit
                        </button>
                        <button className="btn btn-outline-danger btn-sm">
                          Ban
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="tab-pane">
              <div className="reports-section">
                <h3>Analytics & Reports</h3>
                <div className="reports-grid">
                  <div className="report-card">
                    <i className="fas fa-chart-line"></i>
                    <h4>Sales Report</h4>
                    <p>Detailed sales analysis and trends</p>
                    <button className="btn btn-primary">Generate</button>
                  </div>
                  <div className="report-card">
                    <i className="fas fa-users"></i>
                    <h4>User Analytics</h4>
                    <p>User behavior and demographics</p>
                    <button className="btn btn-primary">View</button>
                  </div>
                  <div className="report-card">
                    <i className="fas fa-store"></i>
                    <h4>Club Performance</h4>
                    <p>Club revenue and order metrics</p>
                    <button className="btn btn-primary">Analyze</button>
                  </div>
                  <div className="report-card">
                    <i className="fas fa-download"></i>
                    <h4>Export Data</h4>
                    <p>Export platform data in various formats</p>
                    <button className="btn btn-primary">Export</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="tab-pane">
              <div className="settings-section">
                <h3>Platform Settings</h3>
                <div className="settings-grid">
                  <div className="setting-group">
                    <h5>General Settings</h5>
                    <div className="setting-item">
                      <label>Platform Name</label>
                      <input type="text" defaultValue="ClubSync" />
                    </div>
                    <div className="setting-item">
                      <label>Commission Rate</label>
                      <input type="number" defaultValue="15" />
                    </div>
                  </div>
                  <div className="setting-group">
                    <h5>Payment Settings</h5>
                    <div className="setting-item">
                      <label>Default Currency</label>
                      <select defaultValue="USD">
                        <option>USD</option>
                        <option>EUR</option>
                        <option>GBP</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="settings-actions">
                  <button className="btn btn-primary">Save Changes</button>
                  <button className="btn btn-outline-secondary">Reset</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;