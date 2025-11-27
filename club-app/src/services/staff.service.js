// src/services/staff.service.js
import axiosClient from './axiosClient';

export const staffService = {
  getAll: (clubId) => axiosClient.get(`/clubs/${clubId}/staff`),
  create: (clubId, data) => axiosClient.post(`/clubs/${clubId}/staff`, data),
  update: (clubId, staffId, data) => axiosClient.put(`/clubs/${clubId}/staff/${staffId}`, data),
  delete: (clubId, staffId) => axiosClient.delete(`/clubs/${clubId}/staff/${staffId}`),
  login: (data) => axiosClient.post('/staff/login', data),
  getOrders: (staffId) => axiosClient.get(`/staff/${staffId}/orders`),
};