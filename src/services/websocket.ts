import { io } from 'socket.io-client';

export function websocket(token: string) {
  return io(String(process.env.NEXT_PUBLIC_WEBSOCKET_SERVER_BASEURL), {
    auth: { token },
    transports: ['websocket'],
    withCredentials: true
  });
}
