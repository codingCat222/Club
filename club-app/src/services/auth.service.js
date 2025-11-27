// src/services/auth.service.js
import axiosClient from './axiosClient';

export const authService = {
  login: (credentials) => axiosClient.post('/auth/login', credentials),
  register: (userData) => axiosClient.post('/auth/register', userData),
  logout: () => axiosClient.post('/auth/logout'),
  refreshToken: () => axiosClient.post('/auth/refresh'),
  forgotPassword: (email) => axiosClient.post('/auth/forgot-password', { email }),
  resetPassword: (data) => axiosClient.post('/auth/reset-password', data),
};