import getCookie from '@/components/auth/authorization/getCookie';
import routes from '@/routes/routes';
import api from '@services/api/httpClientService';

export const groupService = {
  add: async (data) => {
    const token = await getCookie();
    const response = await api.post(routes.groups.add, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
  list: async (page = 0, resultsPerPage = 10, sort = 'name,asc', query = '') => {
    //se o query for vazio, será tratado e retornará a consulta normal com todos os registros paginados
    const token = await getCookie();
    const url = routes.groups.list(page, resultsPerPage, sort, query);

    const response = await api.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
  update: async (groupsId, data) => {
    const token = await getCookie();
    const response = await api.put(routes.groups.update(groupsId), data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
  delete: async (groupsId) => {
    const token = await getCookie();
    const response = await api.delete(routes.groups.delete(groupsId), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
  readById: async (groupsId) => {
    const token = await getCookie();
    const response = await api.get(routes.groups.readById(groupsId), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
  listPermissionsByGroup: async (groupId) => {
    const token = await getCookie();
    const response = await api.get(routes.groups.listPermissionsByGroup(groupId), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
  associatePermissionGroup: async (groupId, permissionId) => {
    const token = await getCookie();
    const response = await api.put(routes.groups.associatePermissionGroup(groupId, permissionId), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
  disassociatePermissionGroup: async (groupId, permissionId) => {
    const token = await getCookie();
    const response = await api.delete(routes.groups.disassociatePermissionGroup(groupId, permissionId), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
};