'use client';

import { useEffect, useState } from 'react';

import { Card } from './components/Card';
import { FullScreenLoading } from 'components/FullScreenLoading';

import Cookie from 'js-cookie';
import api from 'lib/api';

import { Container, ErrorContainer, ListContainer, ListItem, Title } from './styles';

interface Service {
  id: number;
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

  const storedCookie = Cookie.get('auth_token');
  const maxRetries = 4;

  async function fetchServices() {
    setConnectionError(false);

    for (let count = 0; count < maxRetries; count++) {
      try {
        setIsPopupValue(count > 0 ? `Conectando<br>Tentativa (${count + 1})` : 'Conectando');

        const response = await api.get('/api/tec/historic', {
          params: { token: storedCookie }
        });

        count = maxRetries;
        setServices(response.data);
      } catch (error) {
        await new Promise((resolve) => setTimeout(resolve, 5000));
        setConnectionError(true);
      }
    }
    setIsPopupValue(null);
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
