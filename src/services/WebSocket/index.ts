import { io } from 'socket.io-client';

export const socket = io('wss://exatelecom-server.vercel.app', {
  path: '/socket.io',
  secure: true,
  transports: ['websocket', 'polling']
});
