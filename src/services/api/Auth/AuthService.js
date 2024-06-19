import api from '@services/api/httpClientService';
import routes from '@/routes/routes';
import { redirect } from 'next/navigation';

export const AuthApiService = {
  login: async (email, password) => {

    const data = {
      email,
      password
    };
    const response = await api.post(routes.auth.login, data );
    return response?.data;
   
  },
  session: async (token) => {

    const data = {
      token
    };

    try {
      const response = await api.post(routes.auth.session, data);
      return response?.data;
    } catch (error) {
      console.error('Erro ao fazer login:', error.userMessage);
      redirect(`?${error.path}`);
    }
  }
};