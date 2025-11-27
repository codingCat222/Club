// src/Auth/tokenHandler.js
export const tokenHandler = {
  getToken() {
    return localStorage.getItem('token');
  },

  setToken(token) {
    localStorage.setItem('token', token);
  },

  removeToken() {
    localStorage.removeItem('token');
  },

  isValid(token) {
    if (!token) return false;
    // Add token validation logic here
    return true;
  }
};