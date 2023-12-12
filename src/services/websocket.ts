'use client';

import { io } from 'socket.io-client';

export default () =>
  io(String(process.env.NEXT_PUBLIC_WEBSOCKET_SERVER_BASEURL), {
    transports: ['websocket']
  });
