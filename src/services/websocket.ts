import { io } from 'socket.io-client';

export function websocket(token = '') {
  return io(String(process.env.NEXT_PUBLIC_WEBSOCKET_SERVER_BASEURL), {
    auth: { token },
    transports: ['websocket'],
    withCredentials: true
  });
}
