const API_URL = '/api';

const apiService = {
  // Auth
  register: async (userData) => {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return res.json();
  },

  login: async (credentials) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    return res.json();
  },

  getCurrentUser: async (token) => {
    const res = await fetch(`${API_URL}/auth/me`, {
      headers: { 'x-auth-token': token },
    });
    return res.json();
  },

  // Wishes
  getWishes: async () => {
    const res = await fetch(`${API_URL}/wishes`);
    return res.json();
  },

  createWish: async (wishData, token) => {
    const res = await fetch(`${API_URL}/wishes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
      body: JSON.stringify(wishData),
    });
    return res.json();
  },
};

export default apiService;
