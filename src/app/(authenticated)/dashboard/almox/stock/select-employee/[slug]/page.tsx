'use client';

import { useEffect, useState } from 'react';

import { List } from './_components/List';
import { FullScreenLoading } from 'components/FullScreenLoading';
import { TimedWait } from 'functions/TimedWait';
import apiRoute from 'services/apiRoute';

import { Container, ErrorContainer, Title } from './styles';

interface Employee {
  id: number;
  name: string;
  role: string;
  identification: string;
  created_at: string;
  admin_id: number;
}

interface SlugType {
  params: {
    slug: string;
  };
}

export default function SelectEmployee({ params }: SlugType) {
  const [employee, setEmployee] = useState<Employee[]>([]);
  const [connectionError, setConnectionError] = useState(false);
  const [isPopupValue, setIsPopupValue] = useState<string | null>(null);

  const maxRetries = 4;

  function generateConnectingMessage(count: number): string {
    return count > 0 ? `Conectando<br>Tentativa (${count + 1})` : 'Conectando';
  }

  async function fetchServices() {
    setConnectionError(false);

    for (let retryCount = 0; retryCount < maxRetries; retryCount++) {
      try {
        setIsPopupValue(generateConnectingMessage(retryCount));

        const response = await apiRoute.post('/api/bridge', {
          baseURL: '/api/almox/stock/select-employee'
        });

        setEmployee(response.data);
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
      <Title>Enviar Carga</Title>
      {isPopupValue && <FullScreenLoading message={isPopupValue} />}
      {connectionError ? (
        <ErrorContainer>
          <span>
            Não foi possível carregar os dados da página devido a instabilidade na conexão. Por
            favor, tente novamente.
          </span>
        </ErrorContainer>
      ) : (
        <List employee={employee} slug={params.slug} />
      )}
    </Container>
  );
}
