// src/api/auth.js
import { AXIOS } from '@/lib/axios'
import type { LoginFormValues } from '@/pages/auth/login/components/login-form';

export const login = async (credentials: LoginFormValues) => {
  const response = await AXIOS.post("/auth/login", credentials);
  return response.data;
};

export const register = async (userData: any) => {
  const response = await AXIOS.post("/auth/register", userData);
  return response.data;
};

export const requestPasswordReset = async (email: string) => {
  const response = await AXIOS.post("/auth/forgot", { email });
  return response.data;
};

export const resetPassword = async (password: string, token: string ) => {
  const response = await AXIOS.post(`/auth/reset`, {
    token,
    password,
  });
  return response.data;
};