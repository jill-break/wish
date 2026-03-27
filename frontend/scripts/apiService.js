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

  getMyWishes: async (token) => {
    const res = await fetch(`${API_URL}/wishes/me`, {
      headers: { 'x-auth-token': token },
    });
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

  grantWish: async (wishId, token) => {
    const res = await fetch(`${API_URL}/wishes/${wishId}/grant`, {
      method: 'PATCH',
      headers: { 'x-auth-token': token },
    });
    
    // Handle non-JSON or error responses gracefully
    if (!res.ok) {
      const errorText = await res.text();
      try {
        const errorJson = JSON.parse(errorText);
        throw new Error(errorJson.message || 'Server error');
      } catch (e) {
        throw new Error('Server returned ' + res.status + ' - Please check if the backend is updated.');
      }
    }
    
    return res.json();
  },
};

export default apiService;
