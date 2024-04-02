import api from '@services/api/httpClienteService';
import routes from '@/routes';

export const studentService = {
  listSummarized: async () => {
    try {
      const response = await api.get(routes.students.listSummarized);
      return response.data; 
    } catch (error) {
      console.error('Erro ao bsucar membros: ', error);
      throw error;
    }
  }
};