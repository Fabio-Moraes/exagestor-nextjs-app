import { cookies } from 'next/headers';

import axios from 'axios';

axios.defaults.withCredentials = true;

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_ORIGIN_BASEURL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

api.interceptors.request.use(
  function (config) {
    const cookieStore = cookies();
    const token = cookieStore.get('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default api;
