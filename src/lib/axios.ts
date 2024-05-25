import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_API,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default instance;
