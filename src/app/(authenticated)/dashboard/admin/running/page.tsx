'use client';

import { useEffect, useState } from 'react';

import { Card } from './_components/Card';
import { FullScreenLoading } from 'components/FullScreenLoading';
import { TimedWait } from 'functions/TimedWait';
import { useContexState } from 'hooks/useGlobalContext';
import apiRoute from 'services/apiRoute';

import { useWebSocket } from 'contexts/WebSocketContext';

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

  const socket = useWebSocket();

  function removePropertyLocalStorage(services: RunningService[]) {
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

  const maxRetries = 4;

  function generateConnectingMessage(count: number): string {
    return count > 0 ? `Conectando<br>Tentativa (${count + 1})` : 'Conectando';
  }

  const fetchServices = async () => {
    setConnectionError(false);

    for (let retryCount = 0; retryCount < maxRetries; retryCount++) {
      try {
        setIsPopupValue(generateConnectingMessage(retryCount));

        const response = await apiRoute.post('/api/bridge', {
          baseURL: '/api/admin/running'
        });

        removePropertyLocalStorage(response.data);
        setRunningService(response.data);
        setIsPopupValue(null);
        break;
      } catch (error: unknown) {
        if (error instanceof Error) {
          const customError = error as CustomError;
          if (customError.response) {
            const statusCode = customError.response.status;
            if (statusCode === 409) {
              break;
            }

            if (retryCount === maxRetries) {
              setConnectionError(true);
              setIsPopupValue(null);
            } else {
              await TimedWait(3000);
            }
          }
        }
      }
    }
  };

  useEffect(() => {
    const initialize = async () => {
      await fetchServices();

      if (socket) {
        socket.on(`RUNNING_REFRESH_ADMIN`, async () => {
          await fetchServices();
        });
      }
    };

    initialize();
    return () => {
      if (socket) {
        socket.off(`RUNNING_REFRESH_ADMIN`, async () => {
          await fetchServices();
        });
      }
    };
  }, [socket]);

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
          {runningService.map((service, index) => (
            <div key={String(index)}>
              <Card service={service} />
            </div>
          ))}
        </ListContainer>
      )}
    </Container>
  );
}
