import axios from 'axios';
import { baseURL } from '../constants/connectedOnServer';

const api = axios.create({ baseURL });

export default api;