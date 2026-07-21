import axios from 'axios';
import type { ApiResponse, UserProfile, Wallet, Service, Execution, Transaction } from '@/types/api';

const client = axios.create({
  baseURL: '/api',
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export async function fetchProfile(): Promise<UserProfile> {
  const res = await client.get<ApiResponse<UserProfile>>('/users/profile');
  return res.data.data;
}

export async function fetchWallet(agentId: string): Promise<Wallet> {
  const res = await client.get<ApiResponse<Wallet>>(`/wallet/${agentId}`);
  return res.data.data;
}

export async function fetchServices(params?: { q?: string; category?: string }): Promise<Service[]> {
  const res = await client.get<ApiResponse<Service[]>>('/services', { params });
  return res.data.data;
}

export async function fetchService(id: string): Promise<Service> {
  const res = await client.get<ApiResponse<Service>>(`/services/${id}`);
  return res.data.data;
}

export async function executeGoal(goal: string): Promise<Execution> {
  const res = await client.post<ApiResponse<Execution>>('/conductor/execute', { goal });
  return res.data.data;
}

export async function fetchTopup(agentId: string, amount: number): Promise<Wallet> {
  const res = await client.post<ApiResponse<Wallet>>('/wallet/topup', { agentId, amount });
  return res.data.data;
}

export async function fetchTransactions(agentId: string): Promise<Transaction[]> {
  const res = await client.get<ApiResponse<Transaction[]>>(`/transactions/${agentId}`);
  return res.data.data;
}

export default client;
