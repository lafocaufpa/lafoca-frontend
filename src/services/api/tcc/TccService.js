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
  list: async (page = 0, resultsPerPage = 10, sort, query = '', lineOfResearchId = '', year = '') => {
    const url = routes.tccs.list(page, resultsPerPage, sort, query, lineOfResearchId, year);
    const response = await api.get(url);
    return response.data;
  },
  update: async (tccId, data) => {
    const token = await getCookie();
    const response = await api.put(routes.tccs.update(tccId), data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
  delete: async (tccId) => {
    const token = await getCookie();
    const response = await api.delete(routes.tccs.delete(tccId), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
  readById: async (tccId) => {
    const token = await getCookie();
    const url = routes.tccs.readById(tccId);
    const response = await api.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
};