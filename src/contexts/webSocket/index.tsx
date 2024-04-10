'use client';

import { usePathname } from 'next/navigation';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { internalApi } from 'services/apiAxios';

import { io, Socket } from 'socket.io-client';
import { useRemoteDisconnectionPopup } from 'store/remoteDisconnectionPopup';
import { useWebsocketConnected } from 'store/websocketConnected';

type WebSocketContextType = Socket | null;
type WebSocketProviderType = { children: ReactNode };

const WebSocketContext = createContext<WebSocketContextType>(null);

const WebSocketProvider = ({ children }: WebSocketProviderType) => {
  const [socket, setSocket] = useState<WebSocketContextType>(null);

  const updateWebsocketConnected = useWebsocketConnected(
    (state) => state.updateWebsocketConnected
  );

  const updateRemoteDisconnectionPopup = useRemoteDisconnectionPopup(
    (state) => state.updateRemoteDisconnectionPopup
  );

  let intervalId: NodeJS.Timeout | null = null;

  const connectSocket = async (): Promise<void> => {
    const { data } = await internalApi.post('/api/decode/auth_token');
    return new Promise<void>((resolve, reject) => {
      const newSocket = io(String(process.env.NEXT_PUBLIC_WEBSOCKET_SERVER_BASEURL), {
        transports: ['websocket'],
        withCredentials: false,
        reconnection: true,
        reconnectionAttempts: Infinity,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 3000
        //query: { ...data }
      });

      newSocket.on('connect', async () => {
        const hidden = document.visibilityState === 'hidden';
        newSocket.emit('CONNECTED_USER', { ...data, hidden });
        resolve();
      });

      newSocket.on('error', (error) => {
        reject(error);
      });

      newSocket.on(`REMOTE_LOGOUT_USER:${data.id}`, async (data) => {
        const { role } = JSON.parse(data);
        await internalApi.post('/api/logout');
        newSocket.disconnect();
        updateRemoteDisconnectionPopup({ open: true, role: role });
      });

      const handleVisibilityChange = () => {
        const hidden = document.visibilityState === 'hidden';
        newSocket.emit('HIDDEN_USER', { ...data, hidden });
      };

      newSocket.emit('HIDDEN_USER', { ...data, hidden: false });
      document.addEventListener('visibilitychange', handleVisibilityChange);
      //document.addEventListener('click', handleVisibilityChange);

      intervalId = setInterval(() => {
        updateWebsocketConnected(newSocket.connected);
      }, 1000);

      setSocket(newSocket);
      return () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        //document.removeEventListener('click', handleVisibilityChange);
        newSocket.disconnect();
      };
    });
  };

  const clearConnection = async () => {
    if (socket) {
      const { data } = await internalApi.post('/api/decode/auth_token');
      socket.off(`REMOTE_LOGOUT_USER:${data.id}`);
      socket.off('connect');
      socket.off('error');
      socket.off('disconnect');
      socket.disconnect();
    }
    if (intervalId) clearInterval(intervalId);
  };

  useEffect(() => {
    const initializeWebSocket = async () => {
      try {
        await clearConnection();
        await connectSocket();
      } catch (error) {
        console.error('Error connecting to WebSocket:', error);
      }
    };

    initializeWebSocket();

    window.addEventListener('load', window.location.reload);
    window.addEventListener('online', window.location.reload);

    return () => {
      window.removeEventListener('load', window.location.reload);
      window.removeEventListener('online', window.location.reload);
      clearConnection();
    };
  }, []);

  return <WebSocketContext.Provider value={socket}>{children}</WebSocketContext.Provider>;
};

const useWebSocket = (): WebSocketContextType => {
  const context = useContext(WebSocketContext);
  return context;
};

const useWebSocketListenerOn = (
  eventName: string,
  handler: <T>(data: Socket | T) => void
): void => {
  const socket = useWebSocket();
  const pathname = usePathname();

  useEffect(() => {
    const eventHandler = (data: Socket) => handler(data);
    if (socket) socket.on(eventName, eventHandler);

    return () => {
      if (socket) socket.off(eventName, eventHandler);
    };
  }, [socket, eventName, handler, pathname]);
};

const useWebSocketListenerEmit = (eventName: string, params = {}): void => {
  const socket = useWebSocket();
  if (socket) socket.emit(eventName, params);
};

export {
  WebSocketProvider,
  useWebSocket,
  WebSocketContext,
  useWebSocketListenerOn,
  useWebSocketListenerEmit
};
