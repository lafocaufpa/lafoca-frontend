import getCookie from '@/components/auth/authorization/getCookie';
import routes from '@/routes/routes';
import api from '@services/api/httpClientService';

export const tccService = { 

  add: async (data) => {
    const token = await getCookie();
    const response = await api.post(routes.tccs.add, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
  list: async (page = 0, resultsPerPage = 10, sort = 'name,asc', query = '') => {
    const url = routes.tccs.list(page, resultsPerPage, sort, query);
    const response = await api.get(url);
    return response.data;
  },
};