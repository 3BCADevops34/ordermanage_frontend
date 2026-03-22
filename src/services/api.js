import axios from 'axios';

const DEFAULT_PRIMARY_URL = 'https://my-backendorder-g7c0a2g9fqawhebn.southeastasia-01.azurewebsites.net';
const DEFAULT_FALLBACK_URLS = [
  'https://hardware-management-1-0.onrender.com',
  'https://hardware-management-2-0.onrender.com',
];

const rawBaseUrl = process.env.REACT_APP_API_BASE_URL || DEFAULT_PRIMARY_URL;
const rawFallbackUrls = process.env.REACT_APP_API_FALLBACK_URLS || DEFAULT_FALLBACK_URLS.join(',');

const normalizeBaseUrl = (value) => {
  if (!value || !value.trim()) {
    return '';
  }

  let normalized = value.trim();

  if (!normalized.startsWith('http://') && !normalized.startsWith('https://')) {
    normalized = `https://${normalized}`;
  }

  while (normalized.endsWith('/')) {
    normalized = normalized.slice(0, -1);
  }

  if (normalized.endsWith('/api')) {
    normalized = normalized.slice(0, -4);
  }

  return normalized;
};

const parseFallbackUrls = (value) =>
  value
    .split(',')
    .map((url) => normalizeBaseUrl(url))
    .filter(Boolean);

const primaryBaseUrl = normalizeBaseUrl(rawBaseUrl);
const fallbackBaseUrls = parseFallbackUrls(rawFallbackUrls);
const baseUrls = [primaryBaseUrl, ...fallbackBaseUrls].filter(
  (url, index, urls) => url && urls.indexOf(url) === index
);

const API_TIMEOUT_MS = 8000;

const api = axios.create({
  baseURL: baseUrls[0],
  timeout: API_TIMEOUT_MS,
});

const shouldTryNextEndpoint = (error) => {
  if (!error.response) {
    return true;
  }

  return error.response.status >= 500;
};

const requestWithFallback = async (requestConfig) => {
  let lastError;

  for (const baseURL of baseUrls) {
    try {
      const response = await axios({
        ...requestConfig,
        baseURL,
        timeout: API_TIMEOUT_MS,
      });
      return response;
    } catch (error) {
      lastError = error;
      if (!shouldTryNextEndpoint(error)) {
        break;
      }
    }
  }

  throw lastError;
};

// Product API
export const getProducts = () => requestWithFallback({ method: 'get', url: '/products' });
export const getProductById = (id) => requestWithFallback({ method: 'get', url: `/products/${id}` });
export const createProduct = (product) => requestWithFallback({ method: 'post', url: '/products', data: product });
export const updateProduct = (id, product) => requestWithFallback({ method: 'put', url: `/products/${id}`, data: product });
export const deleteProduct = (id) => requestWithFallback({ method: 'delete', url: `/products/${id}` });

// Order API
export const getOrders = () => requestWithFallback({ method: 'get', url: '/orders' });
export const getOrderById = (id) => requestWithFallback({ method: 'get', url: `/orders/${id}` });
export const createOrder = (order) => requestWithFallback({ method: 'post', url: '/orders', data: order });
export const updateOrder = (id, order) => requestWithFallback({ method: 'put', url: `/orders/${id}`, data: order });
export const deleteOrder = (id) => requestWithFallback({ method: 'delete', url: `/orders/${id}` });

export default api;