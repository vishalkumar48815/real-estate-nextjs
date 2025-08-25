import axios from '@/lib/axios';

export interface UserRegister {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export const login = async (credentials: { email: string; password: string }) => {
  return axios.post('/auth/signin', credentials);
};

export const register = async (userData: UserRegister) => {
  return axios.post('/auth/signup', userData);
};

export const logout = async () => {
  return axios.post('/auth/signout');
};
