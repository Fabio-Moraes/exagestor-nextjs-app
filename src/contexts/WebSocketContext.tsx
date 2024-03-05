'use client';

import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { TimedWait } from 'functions/TimedWait';

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
        const newSocket = io(String(process.env.NEXT_PUBLIC_WEBSOCKET_SERVER_BASEURL), {
          transports: ['websocket'],
          withCredentials: true
        });

        newSocket.on('connect', () => {
          console.log('Connected to WebSocket server');
        });

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
