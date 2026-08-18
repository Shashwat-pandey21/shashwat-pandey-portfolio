import api from './api';

export const authService = {
  // Login user
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('portfolio_token', response.data.token);
      localStorage.setItem('portfolio_user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  // Get current user profile
  getMe: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  // Logout
  logout: () => {
    localStorage.removeItem('portfolio_token');
    localStorage.removeItem('portfolio_user');
  },

  // Get stored user info
  getCurrentUser: () => {
    const userStr = localStorage.getItem('portfolio_user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('portfolio_token');
  },
};
