import api from '@services/api/httpClientService';
import routes from '@/routes/routes';
import getCookie from '@/components/auth/authorization/getCookie';

export const linesOfResearchService = {
  add: async (data) => {
    const token = await getCookie();
    const response = await api.post(routes.linesOfResearch.add, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
  list: async (page = 0, resultsPerPage = 10, sort = 'name,asc', name) => {
    const response = await api.get(routes.linesOfResearch.list(page, resultsPerPage, sort, name));
    return response.data;
  },
  update: async (lineId, data) => {
    const token = await getCookie();
    const response = await api.put(routes.linesOfResearch.update(lineId), data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  delete: async (lineId) => {
    const token = await getCookie();
    const response = await api.delete(routes.linesOfResearch.delete(lineId), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
  readById: async (lineId) => {
    const token = await getCookie();

    const response = await api.get(routes.linesOfResearch.readById(lineId), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
};