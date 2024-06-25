import getCookie from '@/components/auth/authorization/getCookie';
import routes from '@/routes/routes';
import api from '@services/api/httpClientService';

export const skillService = { 

  list: async (page = 0, resultsPerPage = 10, sort = 'name,asc', query = '') => {
    const token = await getCookie();
    const url = routes.skills.list(page, resultsPerPage, sort, query);

    const response = await api.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
};