'use client';

import Cookie from 'js-cookie';
import { io } from 'socket.io-client';

const storedCookie = Cookie.get('auth_token');
export default () => {
  return io(String(process.env.NEXT_PUBLIC_WEBSOCKET_SERVER_BASEURL), {
    auth: {
      token: storedCookie
    },
    transports: ['websocket'],
    withCredentials: true
  });
};
