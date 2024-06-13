import api from '@services/api/httpClientService';
import routes from '@/routes';

export const lafocaService = {
  listInfo: async () => {
    const response = await api.get(routes.lafoca.listInfo);
    return response.data;
  }
};