// src/routes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
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
import ProtectedRoute from './Auth/ProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/clubs" element={<Clubs />} />
      <Route path="/club/:id" element={<ClubDetails />} />
      
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
      
      <Route path="/staff/dashboard" element={
        <ProtectedRoute allowedRoles={['staff', 'admin']}>
          <StaffDashboard />
        </ProtectedRoute>
      } />
      
      <Route path="/admin/dashboard" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <AdminDashboard />
        </ProtectedRoute>
      } />
      
      <Route path="/owner/dashboard" element={
        <ProtectedRoute allowedRoles={['club_owner', 'admin']}>
          <AdminDashboard />
        </ProtectedRoute>
      } />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;