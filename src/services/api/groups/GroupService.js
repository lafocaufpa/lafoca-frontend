import getCookie from '@/components/auth/authorization/getCookie';
import routes from '@/routes';
import api from '@services/api/httpClientService';

export const groupService = {
  list: async (size, resultsPerPage, sort) => {
    const token = await getCookie();
    const response = await api.get(routes.groups.list, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
};