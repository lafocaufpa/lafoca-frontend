/* eslint-disable no-undef */
import axios from 'axios';

const apiClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}`,
});


export const usersService = {
  async listar(token){
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
    
      }
    };

    // eslint-disable-next-line no-useless-catch
    try {
      const response = await apiClient.get('/users', config);
    
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
};
