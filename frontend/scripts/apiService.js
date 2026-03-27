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
    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to fetch your wishes');
    }
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
    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to create wish');
    }
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
      let errorMessage = 'Server returned ' + res.status;
      try {
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.message || errorMessage;
      } catch (e) {
        // Fallback to text or generic error
        if (errorText.length < 100) errorMessage = errorText || errorMessage;
      }
      throw new Error(errorMessage);
    }
    
    return res.json();
  },
};

export default apiService;
