import getCookie from '@/components/auth/authorization/getCookie';
import routes from '@/routes/routes';
import api from '@services/api/httpClientService';

export const skillService = { 

  add: async (data) => {
    const token = await getCookie();
    const response = await api.post(routes.skills.add, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
  list: async (page = 0, resultsPerPage = 10, sort = 'name,asc', query = '') => {
    const token = await getCookie();
    const url = routes.skills.list(page, resultsPerPage, sort, query);

    const response = await api.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
  update: async (skillsId, data) => {
    const token = await getCookie();
    const response = await api.put(routes.skills.update(skillsId), data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
  delete: async (skillsId) => {
    const token = await getCookie();
    const response = await api.delete(routes.skills.delete(skillsId), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
  readById: async (skillsId) => {
    const token = await getCookie();
    const response = await api.get(routes.skills.readById(skillsId), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
  addPhoto: async (skillId, file) => {
    const token = await getCookie();
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post(routes.skills.addPhoto(skillId), formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      },
    });
    return response.data; 
  },removePhoto: async (skillId) => {
    const token = await getCookie();

    await api.delete(routes.skills.removePhoto(skillId), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};