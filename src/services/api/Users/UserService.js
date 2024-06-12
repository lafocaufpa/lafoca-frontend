import api from '@services/api/httpClientService';
import routes from '@/routes';
import getCookie from '@/components/auth/authorization/getCookie';

export const userService = {

  list: async (page = 0) => {
    try {
      const token = await getCookie();
      const response = await api.get(`${routes.users.list}?page=${page}`, {
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

  delete: async (userId) => {
    try {
      const token = await getCookie();
      const response = await api.delete(`${routes.users.list}/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao deletar usuário: ', error);
      throw error;
    }
  },

  // Adicione sua função de edição aqui
  edit: async (userId, data) => {
    try {
      const token = await getCookie();
      const response = await api.put(`${routes.users.list}/${userId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao editar usuário: ', error);
      throw error;
    }
  }
};
