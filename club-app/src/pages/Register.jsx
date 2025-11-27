// src/pages/Register.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Input from '../components/Input';
import Button from '../components/Button';
import './Register.css';

const Register = () => {
  const [userType, setUserType] = useState('user');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    clubName: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const userData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        role: userType,
        ...(userType === 'club_owner' && { clubName: formData.clubName })
      };

      const result = await register(userData);
      if (result.success) {
        navigate('/');
      } else {
        setError(result.error || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8">
            <div className="register-card">
              <div className="register-header">
                <h2>Join ClubSync</h2>
                <p>Create your account and start experiencing nightlife like never before</p>
              </div>

              <div className="user-type-selector">
                <div className="btn-group" role="group">
                  <input
                    type="radio"
                    className="btn-check"
                    name="userType"
                    id="user"
                    checked={userType === 'user'}
                    onChange={() => setUserType('user')}
                  />
                  <label className="btn btn-outline-primary" htmlFor="user">
                    <i className="fas fa-user me-2"></i>
                    User
                  </label>

                  <input
                    type="radio"
                    className="btn-check"
                    name="userType"
                    id="clubOwner"
                    checked={userType === 'club_owner'}
                    onChange={() => setUserType('club_owner')}
                  />
                  <label className="btn btn-outline-primary" htmlFor="clubOwner">
                    <i className="fas fa-store me-2"></i>
                    Club Owner
                  </label>
                </div>
              </div>

              {error && (
                <div className="alert alert-danger" role="alert">
                  <i className="fas fa-exclamation-circle me-2"></i>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="register-form">
                <div className="row">
                  <div className="col-md-6">
                    <Input
                      label="Full Name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      required
                      icon="fas fa-user"
                    />
                  </div>
                  <div className="col-md-6">
                    <Input
                      label="Phone Number"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      required
                      icon="fas fa-phone"
                    />
                  </div>
                </div>

                <Input
                  label="Email Address"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  icon="fas fa-envelope"
                />

                {userType === 'club_owner' && (
                  <Input
                    label="Club Name"
                    type="text"
                    name="clubName"
                    value={formData.clubName}
                    onChange={handleChange}
                    placeholder="Enter your club name"
                    required
                    icon="fas fa-store"
                  />
                )}

                <div className="row">
                  <div className="col-md-6">
                    <Input
                      label="Password"
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Create a password"
                      required
                      icon="fas fa-lock"
                    />
                  </div>
                  <div className="col-md-6">
                    <Input
                      label="Confirm Password"
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm your password"
                      required
                      icon="fas fa-lock"
                    />
                  </div>
                </div>

                <div className="form-check mb-4">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="terms"
                    required
                  />
                  <label className="form-check-label" htmlFor="terms">
                    I agree to the{' '}
                    <Link to="/terms" className="terms-link">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy" className="terms-link">
                      Privacy Policy
                    </Link>
                  </label>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="large"
                  loading={loading}
                  className="register-btn"
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
                </Button>
              </form>

              <div className="register-footer">
                <p>
                  Already have an account?{' '}
                  <Link to="/login" className="login-link">
                    Sign in here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;