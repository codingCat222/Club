// src/services/payment.service.js
import axiosClient from './axiosClient';

export const paymentService = {
  createIntent: (data) => axiosClient.post('/payments/create-intent', data),
  confirm: (data) => axiosClient.post('/payments/confirm', data),
  getHistory: () => axiosClient.get('/payments/history'),
  refund: (paymentId) => axiosClient.post(`/payments/${paymentId}/refund`),
};