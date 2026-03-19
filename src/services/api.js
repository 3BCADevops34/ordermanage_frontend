import axios from 'axios';

const rawBaseUrl = process.env.REACT_APP_API_BASE_URL || '';
const normalizeBaseUrl = (value) => {
  let normalized = value.trim();

  while (normalized.endsWith('/')) {
    normalized = normalized.slice(0, -1);
  }

  if (normalized.endsWith('/api')) {
    normalized = normalized.slice(0, -4);
  }

  return normalized;
};

const normalizedBaseUrl = normalizeBaseUrl(rawBaseUrl);

const api = axios.create({
  baseURL: normalizedBaseUrl,
});

// Product API
export const getProducts = () => api.get('/products');
export const getProductById = (id) => api.get(`/products/${id}`);
export const createProduct = (product) => api.post('/products', product);
export const updateProduct = (id, product) => api.put(`/products/${id}`, product);
export const deleteProduct = (id) => api.delete(`/products/${id}`);

// Order API
export const getOrders = () => api.get('/orders');
export const getOrderById = (id) => api.get(`/orders/${id}`);
export const createOrder = (order) => api.post('/orders', order);
export const updateOrder = (id, order) => api.put(`/orders/${id}`, order);
export const deleteOrder = (id) => api.delete(`/orders/${id}`);

export default api;