import getCookie from '@/components/auth/authorization/getCookie';
import routes from '@/routes/routes';
import httpClientService from '@services/api/httpClientService';

export const hostCheckService = {

  read: async () => {
    const token = await getCookie();
    const response = await httpClientService.get(routes.hostCheck.read, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
  dbBackup: async () => {
    try {
      const token = await getCookie();
      const response = await httpClientService.get(routes.hostCheck.dbBackup, {
        headers: {
          Authorization: `Bearer ${token}`,
        },

        responseType: 'blob',
      });
    
      const contentDisposition = response.headers['content-disposition'];
      const filename = contentDisposition.split('filename=')[1].replace(/"/g, '');

      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/zip' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error('Erro ao fazer backup:', error);
    }
  },
  update: async (data) => {
    const token = await getCookie();
    const response = await httpClientService.put(routes.hostCheck.update, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
  restoreBackup: async (file) => {
    try {
      const token = await getCookie();
      const formData = new FormData();
      formData.append('file', file);

      const response = await httpClientService.post(routes.hostCheck.restoreBackup, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao restaurar backup:', error);
      return error;
    }
  },
};