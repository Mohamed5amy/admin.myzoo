import axios from 'axios';
import Cookies from 'js-cookie';

// Standard API (uses access token)
export const api = axios.create({
  baseURL: import.meta.env.VITE_API,
});

// Add a request interceptor to dynamically set the Authorization header
api.interceptors.request.use((config) => {
  const token = Cookies.get('_auth');
  if (token) {
    config.headers.Authorization =  `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
