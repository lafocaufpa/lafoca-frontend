import api from '@services/api/httpClienteService';
import routes from '@/routes';

export const projectsService = {
  listSummarized: async () => {
    try {
      const response = await api.get(routes.projects.listSummarized);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar projetos: ', error);
      throw error;
    }
  }
};