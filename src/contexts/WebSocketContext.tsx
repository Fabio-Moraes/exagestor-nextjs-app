'use client';

import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { TimedWait } from 'functions/TimedWait';
import apiRoute from 'services/apiRoute';

import { io, Socket } from 'socket.io-client';

type WebSocketContextType = Socket | null;
const WebSocketContext = createContext<WebSocketContextType>(null);

type ProviderProps = {
  children: ReactNode;
};

export const useWebSocket = (): WebSocketContextType => {
  const socket = useContext(WebSocketContext);
  return socket;
};

const WebSocketProvider = ({ children }: ProviderProps) => {
  const [socket, setSocket] = useState<WebSocketContextType>(null);

  const maxRetries = 4;
  const connectionCheckInterval = 3000;

  useEffect(() => {
    const connectSocket = async (): Promise<void> => {
      try {
        const { data } = await apiRoute.post('/api/user');

        const newSocket = io(String(process.env.NEXT_PUBLIC_WEBSOCKET_SERVER_BASEURL), {
          transports: ['websocket'],
          withCredentials: false,
          reconnection: true, // Ativar reconexão automática
          reconnectionAttempts: 10, // Número máximo de tentativas de reconexão
          reconnectionDelay: 1000, // Atraso inicial de reconexão em milissegundos
          reconnectionDelayMax: 5000, // Atraso máximo de reconexão em milissegundos
          query: { ...data }
        });

        let idleUserEmitted = false;
        newSocket.on('connect', () => {
          newSocket.emit('CONNECTED_USER', {
            ...data,
            status:
              idleUserEmitted && document.visibilityState === 'hidden' ? 'hidden' : 'online'
          });
          idleUserEmitted = true;
        });

        const handleVisibilityChange = async () => {
          if (document.visibilityState === 'hidden') {
            newSocket.emit('HIDDEN_USER', { ...data, hidden: true });
          } else if (document.visibilityState === 'visible') {
            newSocket.emit('HIDDEN_USER', { ...data, hidden: false });
          }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        newSocket.emit('HIDDEN_USER', { ...data, hidden: false });

        newSocket.on('error', (error) => {
          console.error('WebSocket error:', error);
        });

        newSocket.on('disconnect', () => {
          console.log('Disconnected from WebSocket server');
        });

        setSocket(newSocket);
      } catch (error) {
        console.error('Error connecting to WebSocket:', error);
      }
    };

    const attemptReconnection = async (): Promise<void> => {
      for (let retryCount = 0; retryCount < maxRetries; retryCount++) {
        try {
          await connectSocket();
          break;
        } catch (error) {
          console.error(`Reconnection attempt ${retryCount} failed:`, error);
          await TimedWait(3000);
        }
      }
    };

    connectSocket();
    const checkConnectionIntervalId = setInterval(async () => {
      if (socket && socket.disconnected) {
        console.log('Reconnecting due to inactive connection...');
        await attemptReconnection();
      }
    }, connectionCheckInterval);

    return () => {
      clearInterval(checkConnectionIntervalId);
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  return <WebSocketContext.Provider value={socket}>{children}</WebSocketContext.Provider>;
};

export { WebSocketProvider, WebSocketContext };
