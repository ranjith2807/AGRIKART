// API utility functions
// In production, replace these with actual API calls

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

export const api = {
  // Products
  getProducts: async () => {
    // In production: return fetch(`${API_BASE_URL}/products`).then(res => res.json());
    return Promise.resolve([]);
  },

  getProduct: async (id) => {
    // In production: return fetch(`${API_BASE_URL}/products/${id}`).then(res => res.json());
    return Promise.resolve(null);
  },

  // Auth
  login: async (email, password) => {
    // In production: return fetch(`${API_BASE_URL}/auth/login`, { method: 'POST', body: JSON.stringify({ email, password }) }).then(res => res.json());
    return Promise.resolve({ user: null, token: null });
  },

  register: async (userData) => {
    // In production: return fetch(`${API_BASE_URL}/auth/register`, { method: 'POST', body: JSON.stringify(userData) }).then(res => res.json());
    return Promise.resolve({ user: null, token: null });
  },

  // Orders
  getOrders: async () => {
    // In production: return fetch(`${API_BASE_URL}/orders`).then(res => res.json());
    return Promise.resolve([]);
  },

  createOrder: async (orderData) => {
    // In production: return fetch(`${API_BASE_URL}/orders`, { method: 'POST', body: JSON.stringify(orderData) }).then(res => res.json());
    return Promise.resolve({ id: Date.now().toString(), ...orderData });
  },

  // Farmers
  getFarmers: async () => {
    // In production: return fetch(`${API_BASE_URL}/farmers`).then(res => res.json());
    return Promise.resolve([]);
  },

  getFarmer: async (id) => {
    // In production: return fetch(`${API_BASE_URL}/farmers/${id}`).then(res => res.json());
    return Promise.resolve(null);
  },
};

export default api;

