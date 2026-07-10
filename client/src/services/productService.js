import api from './api.js';
import { mockProducts } from '../data/mockProducts.js';

export const getProducts = async (params = {}) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  let products = [...mockProducts];
  if (params.featured) {
    products = products.filter(p => p.featured);
  }
  if (params.category && params.category !== 'All') {
    products = products.filter(p => p.category === params.category);
  }
  
  return { products };
};

export const getProductById = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  const product = mockProducts.find(p => p.id === id);
  if (!product) throw new Error("Product not found");
  return { product };
};

export const createProduct = async (payload) => {
  const { data } = await api.post('/products', payload);
  return data;
};

export const updateProduct = async (id, payload) => {
  const { data } = await api.put(`/products/${id}`, payload);
  return data;
};

export const deleteProduct = async (id) => {
  const { data } = await api.delete(`/products/${id}`);
  return data;
};
