import api from '@services/api/httpClientService';
import routes from '@/routes';

export const lafocaService = {
  listInfo: async () => {
    try {
      const response = await api.get(routes.lafoca.listInfo);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar informações do La Foca: ', error);
      throw error;
    }
  }
};