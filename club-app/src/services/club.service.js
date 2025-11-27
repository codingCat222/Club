// src/services/club.service.js
import axiosClient from './axiosClient';

export const clubService = {
  getAll: () => axiosClient.get('/clubs'),
  getById: (id) => axiosClient.get(`/clubs/${id}`),
  create: (data) => axiosClient.post('/clubs', data),
  update: (id, data) => axiosClient.put(`/clubs/${id}`, data),
  delete: (id) => axiosClient.delete(`/clubs/${id}`),
  search: (query) => axiosClient.get(`/clubs/search?q=${query}`),
  getMenu: (clubId) => axiosClient.get(`/clubs/${clubId}/menu`),
  addMenuItem: (clubId, item) => axiosClient.post(`/clubs/${clubId}/menu`, item),
  updateMenuItem: (clubId, itemId, item) => axiosClient.put(`/clubs/${clubId}/menu/${itemId}`, item),
  deleteMenuItem: (clubId, itemId) => axiosClient.delete(`/clubs/${clubId}/menu/${itemId}`),
};