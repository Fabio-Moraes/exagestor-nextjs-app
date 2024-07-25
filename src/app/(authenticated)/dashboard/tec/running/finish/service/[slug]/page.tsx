'use client';

import { useEffect, useState } from 'react';

import { List } from './_components/List';
import { FullScreenLoading } from 'components/FullScreenLoading';
import { LineSkaleton } from 'components/LineSkaleton';
import { decryptObject } from 'functions';
import { HandleLogout } from 'functions/HandleLogout';
import { TimedWait } from 'functions/TimedWait';
import { internalApi } from 'services/apiAxios';

import * as S from './styles';

interface SlugType {
  params: {
    slug: string;
  };
}

interface ServiceData {
  currentOperation: {
    id: number;
    client_name: string;
    employee_id: string;
    city: string;
    address: string;
    nomenclature: string;
    classification: string;
    status: string;
    update_count: number;
    start_service_at: string;
    created_at: string;
    modification_at: string;
    finished_at: string;
    list_material: string;
    list_service: string;
    observation: string;
    protocol: string;
  }[];
  serviceList: {
    id: number;
    description: string;
    status: string;
  }[];
}

export default function FinishService({ params }: SlugType) {
  const [services, setServices] = useState({} as ServiceData);
  const [connectionError, setConnectionError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isPopupValue, setIsPopupValue] = useState<string | null>(null);

  function generateConnectingMessage(count: number): string {
    return count > 0 ? `Conectando<br>Tentativa (${count + 1})` : 'Conectando';
  }

  async function fetchServices() {
    setConnectionError(false);
    const maxRetries = 4;
    const decryptSlug = decryptObject(params.slug);

    for (let retryCount = 0; retryCount < maxRetries; retryCount++) {
      try {
        setIsPopupValue(generateConnectingMessage(retryCount));

        const response = await internalApi.post('/api/bridge', {
          baseURL: '/api/tec/running/finish/select-service',
          protocol: decryptSlug.protocol?.toString()
        });

        setIsPopupValue(null);
        setServices(response.data);
        break;
      } catch (error: unknown) {
        if (error instanceof Error) {
          const customError = error as CustomError;
          if (customError.response) {
            const statusCode = customError.response.status;

            if (statusCode === 403) {
              HandleLogout();
              break;
            }

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
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <S.Container>
      <S.Title>
        <h1>Serviços</h1>
        {isLoading || !services?.currentOperation?.[0].protocol ? (
          <LineSkaleton width="30rem" />
        ) : (
          <span>PROTOCOLO: {services?.currentOperation?.[0].protocol}</span>
        )}
      </S.Title>
      {isPopupValue && <FullScreenLoading message={isPopupValue} />}
      {connectionError ? (
        <S.ErrorContainer>
          <span>
            Não foi possível carregar os dados da página devido a instabilidade na conexão. Por
            favor, tente novamente.
          </span>
        </S.ErrorContainer>
      ) : (
        <List items={services.serviceList} serviceData={services?.currentOperation?.[0]} />
      )}
    </S.Container>
  );
}
