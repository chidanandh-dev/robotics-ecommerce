import api from './api.js';

export const getAdminStats = async () => {
  const { data } = await api.get('/admin/stats');
  return data;
};

export const getOrders = async () => {
  const { data } = await api.get('/admin/orders');
  return data;
};

export const getMessages = async () => {
  const { data } = await api.get('/admin/messages');
  return data;
};
