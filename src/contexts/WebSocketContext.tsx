'use client';

// Importações necessárias
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { TimedWait } from 'functions/TimedWait';

import { io, Socket } from 'socket.io-client';

// Definição do tipo para o contexto do WebSocket
type WebSocketContextType = Socket | null;
const WebSocketContext = createContext<WebSocketContextType>(null);

// Props do provedor do WebSocket
type ProviderProps = {
  children: ReactNode;
};

// Hook para utilizar o WebSocket
export const useWebSocket = (): WebSocketContextType => {
  const socket = useContext(WebSocketContext);
  return socket;
};

// Provedor do WebSocket
const WebSocketProvider = ({ children }: ProviderProps) => {
  const [socket, setSocket] = useState<WebSocketContextType>(null);

  const maxRetries = 4;
  const connectionCheckInterval = 3000;

  // Efeito para conectar ao WebSocket e lidar com desconexões
  useEffect(() => {
    const connectSocket = async (): Promise<void> => {
      return new Promise<void>((resolve, reject) => {
        const newSocket = io(String(process.env.NEXT_PUBLIC_WEBSOCKET_SERVER_BASEURL), {
          transports: ['websocket'],
          withCredentials: true
        });

        newSocket.on('connect', () => {
          console.log('Connected to WebSocket server');
          resolve();
        });

        newSocket.on('error', (error) => {
          console.error('WebSocket error:', error);
          reject(error);
        });

        newSocket.on('disconnect', () => {
          console.log('Disconnected from WebSocket server');
        });
        setSocket(newSocket);
      });
    };

    // Função para tentar reconectar
    const attemptReconnection = async (): Promise<void> => {
      for (let retryCount = 0; retryCount < maxRetries; retryCount++) {
        try {
          await connectSocket();
          break;
        } catch (error) {
          console.error(`Reconnection attempt ${retryCount} failed:`, error);
          await TimedWait(3000); // Aguarda 3 segundos antes de tentar novamente
        }
      }
    };

    // Inicia a primeira conexão e tenta reconexão em caso de desconexão
    connectSocket();
    const checkConnectionIntervalId = setInterval(async () => {
      if (socket && socket.disconnected) {
        console.log('Reconnecting due to inactive connection...');
        await attemptReconnection();
      }
    }, connectionCheckInterval);

    // Limpa o intervalo e desconecta o socket ao desmontar o componente
    return () => {
      clearInterval(checkConnectionIntervalId);
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  // Fornece o contexto do WebSocket para os componentes filhos
  return <WebSocketContext.Provider value={socket}>{children}</WebSocketContext.Provider>;
};

// Exportações do provedor e do contexto do WebSocket
export { WebSocketProvider, WebSocketContext };
