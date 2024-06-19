import api from '@services/api/httpClientService';
import routes from '@/routes/routes';
import getCookie from '@/components/auth/authorization/getCookie';

export const userService = {

  add: async (data) => {
    const token = await getCookie();
    const response = await api.post(routes.users.add, data, {
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
  },removePhoto: async (userId) => {
    const token = await getCookie();

    await api.delete(routes.users.removePhoto(userId), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  list: async (page = 0, resultsPerPage = 10,  sort = 'dateRegister,desc') => {
    const token = await getCookie();
    const response = await api.get(routes.users.list(page, resultsPerPage, sort), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; 
  },
  readByUserId: async (userId) => {
    const token = await getCookie();
    const response = await api.get(routes.users.readByUserId(userId), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; 
  },
  readByEmail: async (userEmail) => {
    const token = await getCookie();
    const response = await api.get(routes.users.readByEmail(userEmail), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; 
  },
  updatePassword: async (userId, formData) => {
    const token = await getCookie();
    await api.put(routes.users.updatePassword(userId), formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  delete: async (userId) => {
    const token = await getCookie();
    const response = await api.delete(routes.users.delete(userId), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  edit: async (userId, data) => {
    const token = await getCookie();
    const response = await api.put(routes.users.edit(userId), data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
};
