'use client';

import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

//import { TimedWait } from 'functions/TimedWait';
import apiRoute from 'services/apiRoute';

import { io, Socket } from 'socket.io-client';

type WebSocketContextType = Socket | null;
const WebSocketContext = createContext<WebSocketContextType>(null);

type ProviderProps = {
  children: ReactNode;
};

export const useWebSocket = (): WebSocketContextType => useContext(WebSocketContext);

const WebSocketProvider = ({ children }: ProviderProps) => {
  const [socket, setSocket] = useState<WebSocketContextType>(null);

  useEffect(() => {
    const connectSocket = async (): Promise<void> => {
      try {
        const { data } = await apiRoute.post('/api/user');

        const newSocket = io(String(process.env.NEXT_PUBLIC_WEBSOCKET_SERVER_BASEURL), {
          transports: ['websocket'],
          withCredentials: false,
          reconnection: true,
          reconnectionAttempts: 5,
          reconnectionDelay: 1000,
          reconnectionDelayMax: 5000,
          query: { ...data }
        });

        newSocket.on('connect', () => {
          const status = document.visibilityState === 'hidden' ? 'hidden' : 'online';
          newSocket.emit('CONNECTED_USER', { ...data, status });
        });

        const handleVisibilityChange = () => {
          const hidden = document.visibilityState === 'hidden';
          newSocket.emit('HIDDEN_USER', { ...data, hidden });
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        newSocket.emit('HIDDEN_USER', { ...data, hidden: false });
        newSocket.on('error', (error) => console.error('WebSocket error:', error));
        newSocket.on('disconnect', () => console.log('Disconnected from WebSocket server'));

        setSocket(newSocket);
      } catch (error) {
        console.error('Error connecting to WebSocket:', error);
      }
    };

    /*const maxRetries = 4;
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
    };*/

    connectSocket();

    /*const connectionCheckInterval = 3000;
    const checkConnectionIntervalId = setInterval(async () => {
      if (socket && socket.disconnected) {
        console.log('Reconnecting due to inactive connection...');
        await attemptReconnection();
      }
    }, connectionCheckInterval);*/

    window.addEventListener('load', function () {
      console.log('Conexão com a internet restabelecida!');
      window.location.reload();
    });

    function handleOnlineEvent() {
      console.log('Conexão com a internet restabelecida!');
      window.location.reload();
    }

    window.addEventListener('online', handleOnlineEvent);

    return () => {
      window.removeEventListener('online', handleOnlineEvent);
      /* clearInterval(checkConnectionIntervalId); */
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  return <WebSocketContext.Provider value={socket}>{children}</WebSocketContext.Provider>;
};

export { WebSocketProvider, WebSocketContext };
