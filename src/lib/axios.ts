import { getCookie } from '@/lib/cookies';
import Axios from 'axios';

const isServer = typeof window === 'undefined';

const axios = Axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_API
});

axios.interceptors.request.use(async (config) => {
  let token = null;

  if (isServer) {
    token = getCookie('auth.__token');
  } else {
    token = getCookie('auth.__token');
  }
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
export default axios;
