import getCookie from '@/components/auth/authorization/getCookie';
import routes from '@/routes/routes';
import api from '@services/api/httpClientService';

export const permissionService = {
  add: async (data) => {
    const token = await getCookie();
    const response = await api.post(routes.permissions.add, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
  list: async (page = 0, resultsPerPage = 10, sort = 'name,asc', query = '') => {
    //se o query for vazio, será tratado e retornará a consulta normal com todos os registros paginados
    const token = await getCookie();
    const url = routes.permissions.list(page, resultsPerPage, sort, query);

    const response = await api.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
  update: async (permissionId, data) => {
    const token = await getCookie();
    const response = await api.put(routes.permissions.update(permissionId), data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
  delete: async (permissionId) => {
    const token = await getCookie();
    const response = await api.delete(routes.permissions.delete(permissionId), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
  readById: async (permissionId) => {
    const token = await getCookie();
    const response = await api.get(routes.permissions.readById(permissionId), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
};