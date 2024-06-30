import api from '@services/api/httpClientService';
import routes from '@/routes/routes';
import getCookie from '@/components/auth/authorization/getCookie';

export const classService = {
  list: async (page = 0, resultsPerPage = 10, sort = 'year,asc') => {
    const token = await getCookie();
    const url = routes.classes.list(page, resultsPerPage, sort);

    const response = await api.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
  listMemberByYearClass: async (yearClassId, page = 0, resultsPerPage = 10, sort = 'fullName,asc') => {
    const token = await getCookie();
    const url = routes.classes.listMemberByYearClass(yearClassId, page, resultsPerPage, sort);

    const response = await api.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
};