import axios from 'axios';
import handleRequestError from '@services/api/errorHandling';
import { cookies } from 'next/headers';

// eslint-disable-next-line no-undef
const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

const token = cookies().get('next-auth.token')?.value;

const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  }
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => handleRequestError(error)
);

const httpClientPrivateService = {
  get: (url, config = {}) => axiosInstance.get(url, config),
  post: (url, data = {}, config = {}) => axiosInstance.post(url, data, config),
  put: (url, data = {}, config = {}) => axiosInstance.put(url, data, config),
  delete: (url, config = {}) => axiosInstance.delete(url, config)
};

export default httpClientPrivateService;