import api from '@services/api/httpClientService';
import routes from '@/routes/routes';
import getCookie from '@/components/auth/authorization/getCookie';

export const functionService = {
  add: async (data) => {
    const token = await getCookie();
    const response = await api.post(routes.function.add, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
  list: async (page = 0, resultsPerPage = 10, sort, query = '') => {
 
    const url = routes.function.list(page, resultsPerPage, sort, query);

    const response = await api.get(url);
    return response.data;
  },
  update: async (functionId, data) => {
    const token = await getCookie();
    const response = await api.put(routes.function.update(functionId), data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  delete: async (functionId) => {
    const token = await getCookie();
    const response = await api.delete(routes.function.delete(functionId), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
  readById: async (functionId) => {
    const token = await getCookie();
    const response = await api.get(routes.function.readById(functionId), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
};