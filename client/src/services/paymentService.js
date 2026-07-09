import api from './api.js';

export const createCheckoutSession = async (items) => {
  const { data } = await api.post('/payments/create-checkout-session', { items });
  return data;
};
