import api from './api';

export const experienceService = {
  getExperiences: async () => {
    const response = await api.get('/experience');
    return response.data;
  },

  createExperience: async (experienceData) => {
    const response = await api.post('/experience', experienceData);
    return response.data;
  },

  updateExperience: async (id, experienceData) => {
    const response = await api.put(`/experience/${id}`, experienceData);
    return response.data;
  },

  deleteExperience: async (id) => {
    const response = await api.delete(`/experience/${id}`);
    return response.data;
  },
};
