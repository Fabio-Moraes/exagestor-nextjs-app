'use client';

import { useEffect, useState } from 'react';

import { Card } from './components/Card';
import { FullScreenLoading } from 'components/FullScreenLoading';
import { useContexState } from 'hooks/useGlobalContext';
import apiRoute from 'services/apiRoute';

import { io, Socket } from 'socket.io-client';

import { Container, ErrorContainer, ListContainer, Title } from './styles';

interface Protocol {
  [key: string]: { [key: string]: number };
}

interface RunningService {
  id: number;
  employee_id: number;
  client_name: string;
  city: string;
  address: string;
  nomenclature: string;
  classification: string;
  update_count: number;
  status: string;
  created_at: string;
  protocol: string;
  name_admin: string;
  name_tec: string;
}

export default function RunningService() {
  const [runningService, setRunningService] = useState<RunningService[]>([]);
  const [connectionError, setConnectionError] = useState(false);
  const [isPopupValue, setIsPopupValue] = useState<string | null>(null);

  const { setSelectService, setSelectMaterial } = useContexState();

  let socket: Socket | null = null;

  function filterSelectedOpenProtocols(services: RunningService[]) {
    const serviceProtocols = services?.map((service) => service.protocol);

    function filterProtocols(paramPrevItems: Protocol, paramServiceProtocols: string[]) {
      const filteredProtocols: Protocol = {};
      for (const key in paramPrevItems) {
        if (paramServiceProtocols.includes(key)) {
          filteredProtocols[key] = paramPrevItems[key];
        }
      }
      return filteredProtocols;
    }

    setSelectService((prevItems) => filterProtocols(prevItems, serviceProtocols));
    setSelectMaterial((prevItems) => filterProtocols(prevItems, serviceProtocols));
  }

  function generateConnectingMessage(count: number): string {
    return count > 0 ? `Conectando<br>Tentativa (${count + 1})` : 'Conectando';
  }

  const sleep = async (ms: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const maxRetries = 4;
  const reconnectDelay = 3000;
  const connectionCheckInterval = 3000;

  const fetchServices = async () => {
    setConnectionError(false);

    for (let retryCount = 0; retryCount < maxRetries; retryCount++) {
      try {
        setIsPopupValue(generateConnectingMessage(retryCount));

        const response = await apiRoute.post('/api/bridge', {
          baseURL: '/api/admin/running'
        });

        filterSelectedOpenProtocols(response.data);
        setRunningService(response.data);
        break;
      } catch (error) {
        console.error('Error fetching services:', error);
        setConnectionError(true);
        await sleep(reconnectDelay);
      } finally {
        setIsPopupValue(null);
        await sleep(reconnectDelay);
      }
    }
  };

  const connectSocket = async () => {
    return new Promise<void>((resolve, reject) => {
      socket = io(String(process.env.NEXT_PUBLIC_WEBSOCKET_SERVER_BASEURL), {
        transports: ['websocket'],
        withCredentials: true
      });

      socket.on('connect', () => {
        console.log('Connected to WebSocket server');
        resolve();
      });

      socket.on('error', (error) => {
        console.error('WebSocket error:', error);
        reject(error);
      });

      socket.on(`RUNNING_UPDATE_ADMIN`, async () => {
        await fetchServices();
      });
    });
  };

  const attemptReconnection = async () => {
    for (let retryCount = 0; retryCount < maxRetries; retryCount++) {
      try {
        await connectSocket();
        break;
      } catch (connectError: unknown) {
        if (connectError instanceof Error) {
          console.log(`Reconnection attempt ${retryCount} failed: ${connectError.message}`);
        } else {
          console.log(`Reconnection attempt ${retryCount} failed with unknown error`);
        }

        await sleep(reconnectDelay);
      }
    }
  };

  useEffect(() => {
    const initialize = async () => {
      await attemptReconnection();
      await fetchServices();
    };

    initialize();

    const connectionCheckIntervalId = setInterval(async () => {
      if (!socket || socket.disconnected) {
        console.log('Reconnecting due to inactive connection...');
        await attemptReconnection();
      }
    }, connectionCheckInterval);

    return () => {
      console.log('Disconnecting from WebSocket server...');
      clearInterval(connectionCheckIntervalId);
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  return (
    <Container>
      <Title>Em Execução</Title>
      {isPopupValue && <FullScreenLoading message={isPopupValue} />}
      {connectionError ? (
        <ErrorContainer>
          <span>
            Não foi possível carregar os dados da página devido a instabilidade na conexão. Por
            favor, tente novamente.
          </span>
          <button onClick={() => fetchServices()}>Tentar Novamente</button>
        </ErrorContainer>
      ) : (
        <ListContainer>
          {runningService.map((service) => (
            <Card key={service.id} service={service} />
          ))}
        </ListContainer>
      )}
    </Container>
  );
}
