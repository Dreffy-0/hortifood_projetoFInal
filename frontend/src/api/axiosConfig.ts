import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // URL da sua API NestJS
});

// Interceptor para adicionar token (caso queira proteger rotas depois)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
