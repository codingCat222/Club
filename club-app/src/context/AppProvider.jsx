// src/context/AppProvider.jsx
import React from 'react';
import { AuthProvider } from './AuthContext';
import { CartProvider } from './CartContext';
import { ClubProvider } from './ClubContext';

export const AppProvider = ({ children }) => {
  return (
    <AuthProvider>
      <ClubProvider>
        <CartProvider>
          {children}
        </CartProvider>
      </ClubProvider>
    </AuthProvider>
  );
};