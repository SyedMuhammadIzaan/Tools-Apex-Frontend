import { api } from '@/lib/apiClient';
import { AuthResponse, LoginDto, SignupDto } from '@/types';

export const signup = async (payload: SignupDto) => {
  const { data } = await api.post<AuthResponse>('/auth/signup', payload);
  return data;
};

export const login = async (payload: LoginDto) => {
  try {
    // console.log("Sending payload to /auth/login:", payload);
    const response = await api.post<AuthResponse>('/auth/login', payload);
    // console.log("Login response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Login API error:", error);
    throw error;
  }
};
