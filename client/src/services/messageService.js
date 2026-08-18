import api from './api';

export const messageService = {
  // Public submit contact message
  sendMessage: async (messageData) => {
    const response = await api.post('/contact', messageData);
    return response.data;
  },

  // Admin get all contact messages
  getMessages: async () => {
    const response = await api.get('/contact');
    return response.data;
  },

  // Admin toggle / set read status
  toggleReadStatus: async (id, isRead = undefined) => {
    const data = isRead !== undefined ? { isRead } : {};
    const response = await api.put(`/contact/${id}/read`, data);
    return response.data;
  },

  // Admin delete message
  deleteMessage: async (id) => {
    const response = await api.delete(`/contact/${id}`);
    return response.data;
  },

  // Admin dashboard metrics overview
  getDashboardStats: async () => {
    const response = await api.get('/contact/stats');
    return response.data;
  },
};
