import api from '@services/api/httpClientService';
import routes from '@/routes';

export const MemberService = {
  listSummarized: async () => {

    const response = await api.get(routes.members.listSummarized);
    return response.data; 
  },
  list: async (slug) => {
    const response = await api.get(routes.members.member(slug));
    return response.data; 
    
  }
};