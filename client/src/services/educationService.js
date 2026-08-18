import api from './api';

export const educationService = {
  getEducation: async () => {
    const response = await api.get('/education');
    return response.data;
  },

  createEducation: async (educationData) => {
    const response = await api.post('/education', educationData);
    return response.data;
  },

  updateEducation: async (id, educationData) => {
    const response = await api.put(`/education/${id}`, educationData);
    return response.data;
  },

  deleteEducation: async (id) => {
    const response = await api.delete(`/education/${id}`);
    return response.data;
  },
};
