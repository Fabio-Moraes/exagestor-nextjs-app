import axios from 'axios';

const baseURL = 'https://exa-telecom-server.onrender.com';
//const baseURL = 'http://192.168.0.2:3333';

const api = axios.create({ baseURL });

export default api;

//https://blog.rocketseat.com.br/obtendo-o-status-de-progresso-do-envio-de-dados-com-axios/
