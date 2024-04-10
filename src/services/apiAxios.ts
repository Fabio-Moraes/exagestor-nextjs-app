import axios from 'axios';

const frontendApiBaseUrl = process.env.NEXT_PUBLIC_FRONTEND_ORIGIN_BASEURL;
const backendApiBaseUrl = process.env.NEXT_PUBLIC_BACKEND_ORIGIN_BASEURL;

const internalApi = axios.create({
  baseURL: frontendApiBaseUrl,
  headers: {
    'Access-Control-Allow-Origin': frontendApiBaseUrl,
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

const backendApi = axios.create({
  baseURL: backendApiBaseUrl,
  headers: {
    'Access-Control-Allow-Origin': backendApiBaseUrl,
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

export { internalApi, backendApi };
