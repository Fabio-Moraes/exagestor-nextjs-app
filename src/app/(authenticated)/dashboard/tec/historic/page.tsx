'use client';

import { useEffect, useState } from 'react';

import { Card } from './_components/Card';
import { FullScreenLoading } from 'components/FullScreenLoading';
import { TimedWait } from 'functions/TimedWait';
import apiAxios from 'services/apiAxios';

import { Container, ErrorContainer, ListContainer, ListItem, Title } from './styles';

interface Service {
  id: number;
  employee_id: number;
  client_name: string;
  city: string;
  address: string;
  nomenclature: string;
  classification: string;
  status: string;
  update_count: number;
  created_at: string;
  modification_at: string;
  finished_at: string;
  observation: string;
  protocol: string;
}

export default function HistoricService() {
  const [services, setServices] = useState<Service[]>([]);
  const [connectionError, setConnectionError] = useState(false);
  const [isPopupValue, setIsPopupValue] = useState<string | null>(null);

  function generateConnectingMessage(count: number): string {
    return count > 0 ? `Conectando<br>Tentativa (${count + 1})` : 'Conectando';
  }

  const maxRetries = 4;

  async function fetchServices() {
    setConnectionError(false);

    for (let retryCount = 0; retryCount < maxRetries; retryCount++) {
      try {
        setIsPopupValue(generateConnectingMessage(retryCount));

        const response = await apiAxios.post('/api/bridge', {
          baseURL: '/api/tec/historic'
        });

        setServices(response.data);
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
  }

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <Container>
      <Title>Histórico Geral</Title>
      <ListContainer>
        {services.map((service) => (
          <ListItem key={service.id}>
            <Card service={service} />
          </ListItem>
        ))}
      </ListContainer>
      {isPopupValue && <FullScreenLoading message={isPopupValue} />}
      {connectionError && !isPopupValue && (
        <ErrorContainer>
          <span>
            Não foi possível obter dados da lista devido a instabilidade na conexão. Por favor,
            tente novamente.
          </span>
          <button onClick={() => fetchServices()}>Tentar Novamente</button>
        </ErrorContainer>
      )}
    </Container>
  );
}
