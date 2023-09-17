const ip = 'http://192.168.0.8:3333';
//const ip = 'http://192.168.10.100:3333'

export const baseURL = process.env.NODE_ENV === 'production'
  ? 'https://exa-telecom-server.onrender.com'
  : ip;