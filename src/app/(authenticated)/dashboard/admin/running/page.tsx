'use client';

import { useEffect, useState } from 'react';

import { ControlButtons } from './components/ControlButtons';
import { DisplayInfo } from './components/DisplayInfo';
import { FullScreenLoading } from 'components/FullScreenLoading';

import { Container, ErrorContainer, ListContainer, ListItem, Title } from './styles';

import { useContexState } from 'hooks/useGlobalContext';
import Cookie from 'js-cookie';
import api from 'lib/api';

interface Service {
  id: number;
  client_name: string;
  city: string;
  address: string;
  nomenclature: string;
  classification: string;
  update_count: number;
  status: string;
  created_at: string;
  protocol: string;
}

interface Protocol {
  [key: string]: { [key: string]: number };
}

export default function RunningService() {
  const [services, setServices] = useState<Service[]>([]);
  const [connectionError, setConnectionError] = useState(false);
  const [isPopupValue, setIsPopupValue] = useState<string | null>(null);

  const { setSelectService, setSelectMaterial } = useContexState();

  const storedCookie = Cookie.get('auth_token');
  const maxRetries = 4;

  function filterSelectedOpenProtocols(services: Service[]) {
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

        const response = await api.get('/api/employee/running', {
          params: { token: storedCookie }
        });

        count = maxRetries;

        filterSelectedOpenProtocols(response.data);
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
          {services.map((service) => (
            <ListItem key={service.id}>
              <DisplayInfo service={service} />
              <ControlButtons service={service} />
            </ListItem>
          ))}
        </ListContainer>
      )}
    </Container>
  );
}
