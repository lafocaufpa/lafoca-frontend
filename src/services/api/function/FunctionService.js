import api from '@services/api/httpClientService';
import routes from '@/routes/routes';
import getCookie from '@/components/auth/authorization/getCookie';

export const functionService = {
  list: async (page = 0, resultsPerPage = 10, sort = 'name,asc', query = '') => {
    const token = await getCookie();
    const url = routes.function.list(page, resultsPerPage, sort, query);

    const response = await api.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
};