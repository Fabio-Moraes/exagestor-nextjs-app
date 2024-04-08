'use client';

import { useEffect, useState } from 'react';

import { Card } from './_components/Card';
import { FullScreenLoading } from 'components/FullScreenLoading';
import { TimedWait } from 'functions/TimedWait';
import apiAxios from 'services/apiAxios';

import { Container, ErrorContainer, ListContainer, ListItem, Title } from './styles';

interface Material {
  id: number;
  product_name: string;
  name_tec: string;
  name_role: string;
  unit_type: string;
  product_code: string;
  quantity_value: string;
  created_at: string;
}
export default function Historic() {
  const [material, setMaterial] = useState<Material[]>([]);
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
          baseURL: '/api/almox/historic'
        });

        setMaterial(response.data);
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
        {material.map((material) => (
          <ListItem key={material.id}>
            <Card service={material} />
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
