'use client';

import { useEffect, useState } from 'react';

//import { ControlButtons } from './components/ControlButtons';
import { Card } from './components/Card';
import { ControlButtons } from './components/ControlButtons';
import { FullScreenLoading } from 'components/FullScreenLoading';
import { useContexState } from 'hooks/useGlobalContext';

import Cookie from 'js-cookie';
import api from 'lib/api';
//import io from 'services/websocket';
import { io, Socket } from 'socket.io-client';

import { Container, ErrorContainer, ListContainer, ListItem, Title } from './styles';

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

  const { setSelectService, setSelectMaterial /* , runningService, setRunningService */ } =
    useContexState();

  const storedCookie = Cookie.get('auth_token');
  const maxRetries = 4;

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

  async function fetchServices() {
    setConnectionError(false);

    for (let count = 0; count < maxRetries; count++) {
      try {
        setIsPopupValue(count > 0 ? `Conectando<br>Tentativa (${count + 1})` : 'Conectando');

        const response = await api.get('/api/admin/running', {
          params: { token: storedCookie }
        });

        count = maxRetries;

        filterSelectedOpenProtocols(response.data);

        setRunningService(response.data);
        console.log('response', response.data);
      } catch (error) {
        await new Promise((resolve) => setTimeout(resolve, 5000));
        setConnectionError(true);
      }
    }
    setIsPopupValue(null);
  }

  let socket: Socket | null = null;
  let reconnectionAttempts: number = 0;
  const maxReconnectionAttempts: number = 5;

  const connectSocket = () => {
    socket = io(String(process.env.NEXT_PUBLIC_WEBSOCKET_SERVER_BASEURL), {
      auth: {
        token: storedCookie
      },
      transports: ['websocket'],
      withCredentials: true
    });

    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
      reconnectionAttempts = 0;
    });

    socket.on('error', (error) => {
      console.error('WebSocket error:', error);
      attemptReconnection();
    });

    socket.on(`RUNNING_UPDATE_ADMIN`, () => {
      fetchServices();
    });
  };

  const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const attemptReconnection = async () => {
    while (reconnectionAttempts < maxReconnectionAttempts) {
      console.log(
        `Reconnection attempt ${reconnectionAttempts + 1}/${maxReconnectionAttempts}`
      );
      reconnectionAttempts += 1;

      connectSocket();

      // Aguarde um curto período antes de verificar novamente (por exemplo, 5 segundos)
      await wait(5000);

      if (socket && socket.connected) {
        // Reconexão bem-sucedida
        return;
      }
    }

    console.log('Max reconnection attempts reached. Stopping reconnection attempts.');
  };

  useEffect(() => {
    connectSocket();
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
            <ListItem key={service.id}>
              <div>
                <p>{service?.name_tec.concat(' (TEC)')}</p>
              </div>
              <div>
                <Card service={service} />
                <ControlButtons service={service} />
              </div>
            </ListItem>
          ))}
        </ListContainer>
      )}
    </Container>
  );
}
