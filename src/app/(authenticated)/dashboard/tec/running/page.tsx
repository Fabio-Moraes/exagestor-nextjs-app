'use client';

import { useEffect, useState } from 'react';

import { Card } from './components/Card';
import { ControlButtons } from './components/ControlButtons';
import { FullScreenLoading } from 'components/FullScreenLoading';
import { useContexState } from 'hooks/useGlobalContext';
import websocket from 'services/websocket';

import Cookie from 'js-cookie';
import jwtDecode from 'jwt-decode';
import api from 'lib/api';

import { Container, ErrorContainer, ListContainer, ListItem, Title } from './styles';

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

interface Protocol {
  [key: string]: { [key: string]: number };
}

interface Decoded {
  user: {
    id: number;
    name: string;
    role: string;
  };
}

export default function RunningService() {
  const [runningService, setRunningService] = useState<RunningService[]>([]);
  const [connectionError, setConnectionError] = useState(false);
  const [isPopupValue, setIsPopupValue] = useState<string | null>(null);

  const { setSelectService, setSelectMaterial } = useContexState();

  const TOKEN = Cookie.get('auth_token');
  const MAX_RETRIES = 4;

  const decoderToken = jwtDecode(TOKEN ?? '') as Decoded;

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

    for (let count = 0; count < MAX_RETRIES; count++) {
      try {
        setIsPopupValue(count > 0 ? `Conectando<br>Tentativa (${count + 1})` : 'Conectando');

        const response = await api.get('/api/tec/running', {
          params: { token: TOKEN }
        });

        count = MAX_RETRIES;

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

  useEffect(() => {
    let socket = websocket();

    const connectSocket = () => {
      return new Promise<void>((resolve) => {
        socket = websocket();
        socket.on('connect', () => {
          console.log('Connected to WebSocket server');
          resolve();
        });
      });
    };

    let retryCount = 0;
    const maxRetries = 5;

    while (retryCount < maxRetries) {
      try {
        connectSocket();
        return;
      } catch (connectError: unknown) {
        retryCount += 1;

        if (connectError instanceof Error) {
          console.log(`Tentativa ${retryCount} de conexão falhou: ${connectError.message}`);
        } else {
          console.log(`Tentativa ${retryCount} de conexão falhou com erro desconhecido`);
        }
      }
    }

    socket.on('error', (error) => {
      console.error('WebSocket error:', error);
    });

    socket.on(`RUNNING_UPDATE_TEC:${decoderToken?.user.id}`, () => {
      fetchServices();
    });

    fetchServices();
    return () => {
      console.log('Disconnecting from WebSocket server...');
      socket.disconnect();
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
              <div>{/* <p>{service?.name_tec.concat(' (TEC)')}</p> */}</div>
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
