import api from '@services/api/httpClientService';
import routes from '@/routes/routes';
import getCookie from '@/components/auth/authorization/getCookie';

export const projectsService = {
  add: async (data) => {
    const token = await getCookie();
    const response = await api.post(routes.projects.add, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
  list: async (page = 0, resultsPerPage = 10, sort = 'title,asc', query = '', lineOfResearchId = '' ) => {
    const url = routes.projects.list(page, resultsPerPage, sort, query, lineOfResearchId);
    const response = await api.get(url);
    return response.data;
  },
  update: async (projectId, data) => {
    const token = await getCookie();
    const response = await api.put(routes.projects.update(projectId), data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
  delete: async (projectId) => {
    const token = await getCookie();
    const response = await api.delete(routes.projects.delete(projectId), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
  readById: async (projectId) => {
    const token = await getCookie();
    const response = await api.get(routes.projects.readById(projectId), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
  readBySlug: async (projectId) => {
    const response = await api.get(routes.projects.readBySlug(projectId));
    return response.data;
  },
};