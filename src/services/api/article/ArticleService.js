import api from '@services/api/httpClientService';
import routes from '@/routes/routes';

export const articleService = {
  list: async (page = 0, resultsPerPage = 10, sort = 'title,asc', query = '') => {
    const url = routes.article.list(page, resultsPerPage, sort, query);

    const response = await api.get(url);
    return response.data;
  },
};