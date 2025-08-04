import axios from 'axios';
import { storage } from '../lib/storage';

export const api = axios.create({
  baseURL: 'http://localhost:3005',
});

// Attach token
api.interceptors.request.use((config:any) => {
  const token = storage.get<string>('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
