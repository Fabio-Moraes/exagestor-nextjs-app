import axios from 'axios';
import { baseURL } from '../constants/connectedOnServer';

const api = axios.create({ 
    baseURL: baseURL,
     headers: {
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    },
    withCredentials: true
});

export default api;