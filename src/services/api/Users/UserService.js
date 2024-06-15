import api from '@services/api/httpClientService';
import routes from '@/routes';
import getCookie from '@/components/auth/authorization/getCookie';

export const userService = {

  add: async (data) => {
    const token = await getCookie();
    const response = await api.post(routes.users.USERS, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; 
  },
  addPhoto: async (userId, file) => {
    const token = await getCookie();
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post(routes.users.addPhoto(userId), formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      },
    });
    return response.data; 
  },
  list: async (page = 0, resultsPerPage = 10, sort) => {
    const token = await getCookie();
    const response = await api.get(`${routes.users.list}?page=${page}&size=${resultsPerPage}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; 
  },
  read: async (userId) => {
    const token = await getCookie();
    const response = await api.get(`${routes.users.list}/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; 
  },
  delete: async (userId) => {
    const token = await getCookie();
    const response = await api.delete(`${routes.users.list}/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  edit: async (userId, data) => {
    const token = await getCookie();
    const response = await api.put(`${routes.users.list}/${userId}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
};
