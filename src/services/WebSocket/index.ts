import { io } from 'socket.io-client';

export const socket = io('ws://exatelecom-server.vercel.app', {
  transports: ['websocket']
});
