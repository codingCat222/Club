// src/utils/constants.js
export const ROLES = {
  USER: 'user',
  CLUB_OWNER: 'club_owner',
  STAFF: 'staff',
  ADMIN: 'admin'
};

export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PREPARING: 'preparing',
  READY: 'ready',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
};

export const PAYMENT_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
  FAILED: 'failed',
  REFUNDED: 'refunded'
};

export const CLUB_CATEGORIES = [
  'Lounge',
  'Nightclub',
  'Rooftop',
  'Sports Bar',
  'Pub',
  'Karaoke',
  'Dance Club',
  'VIP Lounge'
];

export const CURRENCIES = {
  USD: 'USD',
  EUR: 'EUR',
  GBP: 'GBP',
  NGN: 'NGN'
};