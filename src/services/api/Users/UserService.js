import api from '@services/api/httpClientPrivateService';
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
  }
};