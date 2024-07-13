import api from '@services/api/httpClientService';
import routes from '@/routes/routes';
import getCookie from '@/components/auth/authorization/getCookie';

export const articleService = {
  add: async (data) => {
    const token = await getCookie();
    const response = await api.post(routes.article.add, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
  list: async (page = 0, resultsPerPage = 10, sort, query = '', lineOfResearchId = '', year = '') => {
    const url = routes.article.list(page, resultsPerPage, sort, query, lineOfResearchId, year);
    const response = await api.get(url);
    return response.data;
  },
  update: async (articleId, data) => {
    const token = await getCookie();
    const response = await api.put(routes.article.update(articleId), data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  delete: async (articleId) => {
    const token = await getCookie();
    const response = await api.delete(routes.article.delete(articleId), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
  readById: async (articleId) => {
    const token = await getCookie();
    const response = await api.get(routes.article.readById(articleId), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
  readBySlug: async (articleSlug) => {
    const response = await api.get(routes.article.readBySlug(articleSlug));
    return response.data;
  },
};