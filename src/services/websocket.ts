import { io } from 'socket.io-client';

export function websocket() {
  return io(String(process.env.NEXT_PUBLIC_WEBSOCKET_SERVER_BASEURL), {
    transports: ['websocket'],
    withCredentials: true
  });
}
