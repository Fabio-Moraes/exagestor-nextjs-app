import { io } from 'socket.io-client';

export const socket = io(String(process.env.NEXT_PUBLIC_BACKEND_BASEURL), {
  transports: ['websocket']
});
