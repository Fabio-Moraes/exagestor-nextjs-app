import { io } from 'socket.io-client';

export const socket = io(String(process.env.NEXT_PUBLIC_BACKEND_BASEURL), {
  path: '/api/socket_io',
  transports: ['websocket', 'polling']
});
