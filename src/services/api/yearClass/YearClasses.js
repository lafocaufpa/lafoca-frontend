import api from '@services/api/httpClientService';
import routes from '@/routes/routes';
import getCookie from '@/components/auth/authorization/getCookie';

export const classService = {

  add: async (data) => {
    const token = await getCookie();
    const response = await api.post(routes.classes.add, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
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
  update: async (classId, data) => {
    const token = await getCookie();
    const response = await api.put(routes.classes.update(classId), data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
  delete: async (classId) => {
    const token = await getCookie();
    const response = await api.delete(routes.classes.delete(classId), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
  readById: async (classId) => {
    const token = await getCookie();
    const response = await api.get(routes.classes.readById(classId), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
};