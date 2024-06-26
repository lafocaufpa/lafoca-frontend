import api from '@services/api/httpClientService';
import routes from '@/routes/routes';
import getCookie from '@/components/auth/authorization/getCookie';

export const MemberService = {
  add: async (data) => {
    const token = await getCookie();
    const response = await api.post(routes.members.add, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  addPhoto: async (memberId, file) => {
    const token = await getCookie();
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post(routes.members.addPhoto(memberId), formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  removePhoto: async (memberId) => {
    const token = await getCookie();

    await api.delete(routes.members.removePhoto(memberId), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  list: async (page = 0, resultsPerPage = 10, sort = 'fullName,asc') => {
    const response = await api.get(routes.members.list(page, resultsPerPage, sort));
    return response.data;
  },

  readById: async (memberId) => {
    const response = await api.get(routes.members.readById(memberId));
    return response.data;
  },

  readBySlug: async (slug) => {
    const response = await api.get(routes.members.readBySlug(slug));
    return response.data;
  },

  update: async (memberId, data) => {
    const token = await getCookie();
    const response = await api.put(routes.members.update(memberId), data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  delete: async (memberId) => {
    const token = await getCookie();
    const response = await api.delete(routes.members.delete(memberId), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  listSummarized: async () => {
    const response = await api.get(routes.members.listSummarized);
    return response.data;
  }
};
