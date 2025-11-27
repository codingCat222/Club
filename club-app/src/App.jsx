// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ClubProvider } from './context/ClubContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './Auth/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Clubs from './pages/Clubs';
import ClubDetails from './pages/ClubDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import QRCodePage from './pages/QRCodePage';
import Orders from './pages/Orders';
import Profile from './pages/Profile';
import StaffDashboard from './pages/StaffDashboard';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';

import './App.css';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="preloader">
        <div className="preloader-content">
          <div className="club-icon">
            <i className="fas fa-cocktail fa-3x"></i>
          </div>
          <h2>ClubSync</h2>
          <div className="loading-spinner"></div>
          <p>Loading amazing nightlife experience...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <AuthProvider>
        <ClubProvider>
          <CartProvider>
            <div className="App">
              <Navbar />
              <main className="main-content">
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/clubs" element={<Clubs />} />
                  <Route path="/club/:id" element={<ClubDetails />} />
                  
                  {/* Protected User Routes */}
                  <Route path="/cart" element={
                    <ProtectedRoute allowedRoles={['user']}>
                      <Cart />
                    </ProtectedRoute>
                  } />
                  <Route path="/checkout" element={
                    <ProtectedRoute allowedRoles={['user']}>
                      <Checkout />
                    </ProtectedRoute>
                  } />
                  <Route path="/qr-code/:orderId" element={
                    <ProtectedRoute allowedRoles={['user']}>
                      <QRCodePage />
                    </ProtectedRoute>
                  } />
                  <Route path="/orders" element={
                    <ProtectedRoute allowedRoles={['user']}>
                      <Orders />
                    </ProtectedRoute>
                  } />
                  <Route path="/profile" element={
                    <ProtectedRoute allowedRoles={['user', 'club_owner', 'staff', 'admin']}>
                      <Profile />
                    </ProtectedRoute>
                  } />
                  
                  {/* Club Owner Routes */}
                  <Route path="/owner/dashboard" element={
                    <ProtectedRoute allowedRoles={['club_owner', 'admin']}>
                      <AdminDashboard />
                    </ProtectedRoute>
                  } />
                  
                  {/* Staff Routes */}
                  <Route path="/staff/dashboard" element={
                    <ProtectedRoute allowedRoles={['staff', 'admin']}>
                      <StaffDashboard />
                    </ProtectedRoute>
                  } />
                  
                  {/* Admin Routes */}
                  <Route path="/admin/dashboard" element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <AdminDashboard />
                    </ProtectedRoute>
                  } />
                  
                  {/* 404 Page */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </CartProvider>
        </ClubProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;