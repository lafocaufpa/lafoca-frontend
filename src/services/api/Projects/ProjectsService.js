import api from '@services/api/httpClientService';
import routes from '@/routes/routes';

export const projectsService = {
  listSummarized: async () => {
    const response = await api.get(routes.projects.listSummarized);
    return response.data;
  }
};