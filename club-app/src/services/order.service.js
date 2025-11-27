// src/services/order.service.js
import axiosClient from './axiosClient';

export const orderService = {
  create: (data) => axiosClient.post('/orders', data),
  getAll: () => axiosClient.get('/orders'),
  getById: (id) => axiosClient.get(`/orders/${id}`),
  updateStatus: (id, status) => axiosClient.patch(`/orders/${id}/status`, { status }),
  getUserOrders: () => axiosClient.get('/orders/user'),
  getClubOrders: (clubId) => axiosClient.get(`/orders/club/${clubId}`),
  cancel: (id) => axiosClient.post(`/orders/${id}/cancel`),
};