import { io } from 'socket.io-client';

export const socket = io('wss://exatelecom-server.vercel.app', {
  transports: ['websocket']
});
