// src/pages/Profile.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Input from '../components/Input';
import Button from '../components/Button';
import './Profile.css';

const Profile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || ''
      }));
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setMessage('');
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setMessage('Profile updated successfully!');
      setLoading(false);
    }, 1000);
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    
    if (formData.newPassword !== formData.confirmPassword) {
      setMessage('New passwords do not match');
      return;
    }
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setMessage('Password updated successfully!');
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
      setLoading(false);
    }, 1000);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-header">
          <div className="header-content">
            <h1>Account Settings</h1>
            <p>Manage your profile and account preferences</p>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-3">
            <div className="profile-sidebar">
              <div className="user-card">
                <div className="user-avatar">
                  {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="user-info">
                  <h4>{user.name}</h4>
                  <p className="user-email">{user.email}</p>
                  <span className={`user-role ${user.role}`}>
                    {user.role.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="sidebar-nav">
                <button
                  className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
                  onClick={() => setActiveTab('profile')}
                >
                  <i className="fas fa-user"></i>
                  Profile Information
                </button>
                <button
                  className={`nav-item ${activeTab === 'security' ? 'active' : ''}`}
                  onClick={() => setActiveTab('security')}
                >
                  <i className="fas fa-lock"></i>
                  Security
                </button>
                <button
                  className={`nav-item ${activeTab === 'preferences' ? 'active' : ''}`}
                  onClick={() => setActiveTab('preferences')}
                >
                  <i className="fas fa-cog"></i>
                  Preferences
                </button>
                <button
                  className={`nav-item ${activeTab === 'notifications' ? 'active' : ''}`}
                  onClick={() => setActiveTab('notifications')}
                >
                  <i className="fas fa-bell"></i>
                  Notifications
                </button>
              </div>
            </div>
          </div>

          <div className="col-lg-9">
            <div className="profile-content">
              {activeTab === 'profile' && (
                <div className="content-card" data-aos="fade-up">
                  <div className="card-header">
                    <h3>Profile Information</h3>
                    <p>Update your personal details and contact information</p>
                  </div>
                  
                  <form onSubmit={handleProfileUpdate}>
                    <div className="row">
                      <div className="col-md-6">
                        <Input
                          label="Full Name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Enter your full name"
                          required
                          icon="fas fa-user"
                        />
                      </div>
                      <div className="col-md-6">
                        <Input
                          label="Phone Number"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="Enter your phone number"
                          icon="fas fa-phone"
                        />
                      </div>
                    </div>
                    
                    <Input
                      label="Email Address"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email address"
                      required
                      icon="fas fa-envelope"
                    />
                    
                    {message && (
                      <div className={`alert ${message.includes('successfully') ? 'alert-success' : 'alert-danger'}`}>
                        <i className={`fas ${message.includes('successfully') ? 'fa-check-circle' : 'fa-exclamation-circle'} me-2`}></i>
                        {message}
                      </div>
                    )}
                    
                    <div className="form-actions">
                      <Button
                        type="submit"
                        variant="primary"
                        loading={loading}
                      >
                        {loading ? 'Updating...' : 'Update Profile'}
                      </Button>
                    </div>
                  </form>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="content-card" data-aos="fade-up">
                  <div className="card-header">
                    <h3>Security Settings</h3>
                    <p>Change your password and manage account security</p>
                  </div>
                  
                  <form onSubmit={handlePasswordChange}>
                    <Input
                      label="Current Password"
                      type="password"
                      name="currentPassword"
                      value={formData.currentPassword}
                      onChange={handleInputChange}
                      placeholder="Enter your current password"
                      required
                      icon="fas fa-lock"
                    />
                    
                    <div className="row">
                      <div className="col-md-6">
                        <Input
                          label="New Password"
                          type="password"
                          name="newPassword"
                          value={formData.newPassword}
                          onChange={handleInputChange}
                          placeholder="Enter new password"
                          required
                          icon="fas fa-lock"
                        />
                      </div>
                      <div className="col-md-6">
                        <Input
                          label="Confirm New Password"
                          type="password"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          placeholder="Confirm new password"
                          required
                          icon="fas fa-lock"
                        />
                      </div>
                    </div>
                    
                    {message && (
                      <div className={`alert ${message.includes('successfully') ? 'alert-success' : 'alert-danger'}`}>
                        <i className={`fas ${message.includes('successfully') ? 'fa-check-circle' : 'fa-exclamation-circle'} me-2`}></i>
                        {message}
                      </div>
                    )}
                    
                    <div className="form-actions">
                      <Button
                        type="submit"
                        variant="primary"
                        loading={loading}
                      >
                        {loading ? 'Updating...' : 'Change Password'}
                      </Button>
                    </div>
                  </form>
                  
                  <div className="security-features">
                    <h5>Security Features</h5>
                    <div className="feature-list">
                      <div className="feature-item">
                        <i className="fas fa-shield-alt"></i>
                        <div>
                          <strong>Two-Factor Authentication</strong>
                          <p>Add an extra layer of security to your account</p>
                        </div>
                        <button className="btn btn-outline-primary btn-sm">
                          Enable
                        </button>
                      </div>
                      <div className="feature-item">
                        <i className="fas fa-devices"></i>
                        <div>
                          <strong>Active Sessions</strong>
                          <p>Manage your logged-in devices</p>
                        </div>
                        <button className="btn btn-outline-primary btn-sm">
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'preferences' && (
                <div className="content-card" data-aos="fade-up">
                  <div className="card-header">
                    <h3>Preferences</h3>
                    <p>Customize your ClubSync experience</p>
                  </div>
                  
                  <div className="preference-settings">
                    <div className="setting-group">
                      <h5>Notification Preferences</h5>
                      <div className="setting-item">
                        <div>
                          <strong>Order Updates</strong>
                          <p>Get notified about your order status</p>
                        </div>
                        <label className="switch">
                          <input type="checkbox" defaultChecked />
                          <span className="slider"></span>
                        </label>
                      </div>
                      <div className="setting-item">
                        <div>
                          <strong>Promotional Offers</strong>
                          <p>Receive special deals and discounts</p>
                        </div>
                        <label className="switch">
                          <input type="checkbox" defaultChecked />
                          <span className="slider"></span>
                        </label>
                      </div>
                    </div>
                    
                    <div className="setting-group">
                      <h5>Appearance</h5>
                      <div className="theme-selector">
                        <button className="theme-option active">
                          <div className="theme-preview light"></div>
                          <span>Light</span>
                        </button>
                        <button className="theme-option">
                          <div className="theme-preview dark"></div>
                          <span>Dark</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className="content-card" data-aos="fade-up">
                  <div className="card-header">
                    <h3>Notification Center</h3>
                    <p>Manage how you receive notifications</p>
                  </div>
                  
                  <div className="notifications-list">
                    <div className="notification-item unread">
                      <div className="notification-icon">
                        <i className="fas fa-shopping-cart"></i>
                      </div>
                      <div className="notification-content">
                        <strong>Order Ready for Pickup</strong>
                        <p>Your order at Neon Lounge is ready for collection</p>
                        <span className="notification-time">2 hours ago</span>
                      </div>
                      <button className="notification-action">
                        <i className="fas fa-times"></i>
                      </button>
                    </div>
                    
                    <div className="notification-item">
                      <div className="notification-icon">
                        <i className="fas fa-tag"></i>
                      </div>
                      <div className="notification-content">
                        <strong>Special Offer</strong>
                        <p>20% off your next order at Sky Bar</p>
                        <span className="notification-time">1 day ago</span>
                      </div>
                      <button className="notification-action">
                        <i className="fas fa-times"></i>
                      </button>
                    </div>
                    
                    <div className="notification-item">
                      <div className="notification-icon">
                        <i className="fas fa-bell"></i>
                      </div>
                      <div className="notification-content">
                        <strong>New Club Added</strong>
                        <p>Check out the new Electric Lounge in your area</p>
                        <span className="notification-time">3 days ago</span>
                      </div>
                      <button className="notification-action">
                        <i className="fas fa-times"></i>
                      </button>
                    </div>
                  </div>
                  
                  <div className="notifications-actions">
                    <button className="btn btn-outline-primary">
                      Mark All as Read
                    </button>
                    <button className="btn btn-outline-danger">
                      Clear All
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;