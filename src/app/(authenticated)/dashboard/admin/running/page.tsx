'use client';

import { useEffect, useState } from 'react';

import { useContexState as useContexState2 } from '../hooks/useGlobalContext';
import { Card } from './components/Card';
import { FullScreenLoading } from 'components/FullScreenLoading';
import { useContexState } from 'hooks/useGlobalContext';
import apiMiddleware from 'services/apiMiddleware';

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
  const { setRunningLoad } = useContexState2();

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

  function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /* onst storedCookie = Cookie.get('auth_token'); */
  const maxReconnectionAttempts = 4;

  async function fetchServices(): Promise<void> {
    setConnectionError(false);

    let retryCount = 0;

    while (retryCount < maxReconnectionAttempts) {
      try {
        setIsPopupValue(generateConnectingMessage(retryCount));

        const response = await apiMiddleware.post('/api/redirect', {
          baseURL: '/api/admin/running'
        });

        filterSelectedOpenProtocols(response.data);
        setRunningService(response.data);
        console.log('response', response.data);
        break;
      } catch (error) {
        await sleep(5000);
        setRunningLoad(false);
        setConnectionError(true);
      } finally {
        setIsPopupValue(null);
        await sleep(2000);
        setRunningLoad(false);
      }

      retryCount++;
    }
  }

  let socket: Socket | null = null;

  const connectSocket = () => {
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

      socket.on(`RUNNING_UPDATE_ADMIN`, () => {
        fetchServices();
      });
    });
  };

  const attemptReconnection = async () => {
    let retryCount = 0;

    while (retryCount < maxReconnectionAttempts) {
      try {
        await connectSocket();
        break;
      } catch (connectError: unknown) {
        retryCount += 1;

        if (connectError instanceof Error) {
          console.log(`Tentativa ${retryCount} de conexão falhou: ${connectError.message}`);
        } else {
          console.log(`Tentativa ${retryCount} de conexão falhou com erro desconhecido`);
        }

        await sleep(3000);
      }
    }
  };

  useEffect(() => {
    attemptReconnection();
    fetchServices();

    return () => {
      console.log('Disconnecting from WebSocket server...');
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
