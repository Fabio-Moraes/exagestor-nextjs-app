'use client';

import { usePathname } from 'next/navigation';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { TimedWait } from 'functions/TimedWait';
import apiRoute from 'services/apiRoute';

import { useGlobalStatus } from '../globalStatus';

import { io, Socket } from 'socket.io-client';

type WebSocketContextType = Socket | null;

type ProviderProps = {
  children: ReactNode;
};

const WebSocketContext = createContext<WebSocketContextType>(null);

const WebSocketProvider = ({ children }: ProviderProps) => {
  const [socket, setSocket] = useState<WebSocketContextType>(null);
  const { setWebsocketConnected, setOpenNotificationbar } = useGlobalStatus();

  const pathname = usePathname();

  const connectSocket = async (): Promise<void> => {
    try {
      const { data } = await apiRoute.post('/api/user');

      const newSocket = io(String(process.env.NEXT_PUBLIC_WEBSOCKET_SERVER_BASEURL), {
        transports: ['websocket'],
        withCredentials: false,
        reconnection: true,
        reconnectionAttempts: Infinity,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 3000,
        query: { ...data }
      });

      newSocket.on('connect', async () => {
        const status = document.visibilityState === 'hidden' ? 'hidden' : 'online';
        newSocket.emit('CONNECTED_USER', { ...data, status });
        setSocket(newSocket);
        setWebsocketConnected(true);
        await TimedWait(1000);
        setOpenNotificationbar(true);
      });

      newSocket.on(`LOGOUT_USER:${data.id}`, async () => {
        await apiRoute.post('/api/logout');
        newSocket.emit('DISCONNECTED_USER');
        window.location.reload();
      });

      const handleVisibilityChange = () => {
        const hidden = document.visibilityState === 'hidden';
        newSocket.emit('HIDDEN_USER', { ...data, hidden });
      };

      document.addEventListener('visibilitychange', handleVisibilityChange);
      newSocket.emit('HIDDEN_USER', { ...data, hidden: false });
      newSocket.on('error', (error) => console.error('WebSocket error:', error));
      newSocket.on('disconnect', () => {
        setSocket(newSocket);
        setWebsocketConnected(false);
        setOpenNotificationbar(false);
        console.log('Disconnected from WebSocket server');
      });

      setSocket(newSocket);
    } catch (error) {
      console.error('Error connecting to WebSocket:', error);
    }
  };

  useEffect(() => {
    if (socket) {
      socket.disconnect();

      async () => {
        const { data } = await apiRoute.post('/api/user');
        socket.off(`LOGOUT_USER:${data.id}`);
      };

      socket.off('connect');
      socket.off('error');
      socket.off('disconnect');
    }

    connectSocket();

    window.addEventListener('load', window.location.reload);
    window.addEventListener('online', window.location.reload);

    return () => {
      window.removeEventListener('load', window.location.reload);
      window.removeEventListener('online', window.location.reload);
      if (socket) {
        socket.disconnect();

        async () => {
          const { data } = await apiRoute.post('/api/user');
          socket.off(`LOGOUT_USER:${data.id}`);
        };

        socket.off('connect');
        socket.off('error');
        socket.off('disconnect');
      }
    };
  }, [pathname]);

  return <WebSocketContext.Provider value={socket}>{children}</WebSocketContext.Provider>;
};

const useWebSocket = (): WebSocketContextType => {
  const context = useContext(WebSocketContext);
  return context;
};

export { WebSocketProvider, useWebSocket, WebSocketContext };
