import axios from 'axios';

axios.defaults.withCredentials = true;

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_ORIGIN_BASEURL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

api.defaults.withCredentials = true;

export default api;
