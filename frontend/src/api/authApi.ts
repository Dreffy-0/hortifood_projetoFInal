import api from './axiosConfig';

export const login = async (email: string, senha: string) => {
  return api.post('/auth/login', { email, senha });
};
