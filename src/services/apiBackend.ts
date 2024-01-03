import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_BACKEND_ORIGIN_BASEURL;
const api = axios.create({
  baseURL,
  headers: {
    'Access-Control-Allow-Origin': baseURL,
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

export default api;
