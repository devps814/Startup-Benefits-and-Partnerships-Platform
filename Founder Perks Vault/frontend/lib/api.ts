import axios from 'axios';
import { Deal, Claim, User } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export const authAPI = {
  register: async (email: string, password: string, name: string) => {
    const response = await api.post<{ token: string; user: User }>('/auth/register', {
      email,
      password,
      name,
    });
    return response.data;
  },
  login: async (email: string, password: string) => {
    const response = await api.post<{ token: string; user: User }>('/auth/login', {
      email,
      password,
    });
    return response.data;
  },
};

export const dealsAPI = {
  getAll: async (category?: string, search?: string): Promise<Deal[]> => {
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (search) params.append('search', search);
    
    const response = await api.get<Deal[]>(`/deals?${params.toString()}`);
    return response.data;
  },
  getById: async (id: string): Promise<Deal> => {
    const response = await api.get<Deal>(`/deals/${id}`);
    return response.data;
  },
};

export const claimsAPI = {
  create: async (dealId: string): Promise<Claim> => {
    const response = await api.post<Claim>('/claims', { dealId });
    return response.data;
  },
  getMyClaims: async (): Promise<Claim[]> => {
    const response = await api.get<Claim[]>('/claims/me');
    return response.data;
  },
};
