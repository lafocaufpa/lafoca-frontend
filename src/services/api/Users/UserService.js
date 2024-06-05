import api from '@services/api/httpClientService';
import routes from '@/routes';

export const userService = {

  list: async () => {
    try {
      const response = await api.get(routes.users.list);
      return response.data; 
    } catch (error) {
      console.error('Erro ao buscar usuários: ', error);
      throw error;
    }
  },
  resetPassword: async (data) => {
    try {
      const response = await api.put(routes.users.resetPassword, data);
      return response.data; 
    } catch (error) {
      console.error('Erro ao buscar usuários: ', error);
      throw error;
    }
  }
};