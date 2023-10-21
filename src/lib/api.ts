import axios from 'axios';
import { baseURL } from '../constants/connectedOnServer';

const api = axios.create({ 
    baseURL: baseURL,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    },
    withCredentials: true
});

export default api;