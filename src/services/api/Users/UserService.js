import api from '@services/api/httpClientService';
import routes from '@/routes';
import getCookie from '@/components/auth/authorization/getCookie';

export const userService = {

  list: async () => {
    try {
      const token = await getCookie();
      const response = await api.get(routes.users.list, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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