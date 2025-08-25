import axios from '@/lib/axios';

export const login = async (credentials: { email: string; password: string }) => {
  return axios.post('/auth/signin', credentials);
};

export const register = async (userData: any) => {
  return axios.post('/auth/signup', userData);
};

export const logout = async () => {
  return axios.post('/auth/signout');
};
