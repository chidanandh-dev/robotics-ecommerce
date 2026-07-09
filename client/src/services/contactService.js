import api from './api.js';

export const sendContactMessage = async (payload) => {
  const { data } = await api.post('/contact', payload);
  return data;
};
