import getCookie from '@/components/auth/authorization/getCookie';
import routes from '@/routes/routes';
import api from '@services/api/httpClientService';

export const groupService = {
  listWithoutPag: async () => {
    const token = await getCookie();
    const response = await api.get(routes.groups.listWithoutPag, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
  list: async (page = 0, resultsPerPage = 10, sort = 'name,asc', query = '') => {
    //se o query for vazio, será tratado e retornará a consulta normal com todos os registros paginados
    const token = await getCookie();
    const url = routes.groups.list(page, resultsPerPage, sort, query);

    const response = await api.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
};