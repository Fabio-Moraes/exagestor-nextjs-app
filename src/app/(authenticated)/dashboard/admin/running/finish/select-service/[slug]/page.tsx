'use client';

import { useEffect, useState } from 'react';

import { List } from './_components/List';
import { FullScreenLoading } from 'components/FullScreenLoading';
import { LineSkaleton } from 'components/LineSkaleton';
import { decryptObject } from 'functions';
import { TimedWait } from 'functions/TimedWait';
import { internalApi } from 'services/apiAxios';

import { Container, ErrorContainer, Title } from './styles';

const data = [
  { id: '0', description: 'ADQ DE POSTES (EQPTOS MEC NO POSTE)' },
  { id: '1', description: 'READQ DE POSTES (EQPTOS MEC NO POSTE)' },
  { id: '2', description: 'INSTALAÇÃO DE PADS PARA PROTEÇÃO DE REDE' }, //<<<<<
  { id: '3', description: 'RETENC CORD/ CBS' },
  { id: '4', description: 'RET CORD DO POSTE' },
  { id: '5', description: 'MANUT PODA DE GALHOS COM REMOCAO-F' },
  { id: '6', description: 'MANUT CAPINA LIMPZ SOBRE TAMP DE C' },
  { id: '7', description: 'MANUT CAPINA DE POSTE RAIO = 2,0M-' },
  { id: '8', description: 'MANUT CAPINA DE MARCO DIÂMTR DE 2.0M' }
];

interface SlugType {
  params: {
    slug: string;
  };
}

interface ServiceData {
  id: number;
  client_name: string;
  employee_id: string;
  city: string;
  address: string;
  nomenclature: string;
  classification: string;
  status: string;
  update_count: number;
  created_at: string;
  modification_at: string;
  finished_at: string;
  list_material: string;
  list_service: string;
  observation: string;
  protocol: string;
}

export default function FinishService({ params }: SlugType) {
  const [ServiceData, setServiceData] = useState<ServiceData[]>([]);
  const [connectionError, setConnectionError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isPopupValue, setIsPopupValue] = useState<string | null>(null);

  const maxRetries = 4;
  const decryptSlug = decryptObject(params.slug);

  function generateConnectingMessage(count: number): string {
    return count > 0 ? `Conectando<br>Tentativa (${count + 1})` : 'Conectando';
  }

  async function fetchServices() {
    setConnectionError(false);

    for (let retryCount = 0; retryCount < maxRetries; retryCount++) {
      try {
        setIsPopupValue(generateConnectingMessage(retryCount));

        const response = await internalApi.post('/api/bridge', {
          baseURL: '/api/admin/running/finish/select-service',
          protocol: decryptSlug.protocol?.toString(),
          employeeId: decryptSlug.employeeId?.toString()
        });

        setIsPopupValue(null);
        setServiceData(response.data);
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
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <Container>
      <Title>
        <h1>Selecionar Serviço</h1>
        {isLoading || !ServiceData[0]?.protocol ? (
          <LineSkaleton width="30rem" />
        ) : (
          <span>PROTOCOLO: {ServiceData[0]?.protocol}</span>
        )}
      </Title>
      {isPopupValue && <FullScreenLoading message={isPopupValue} />}
      {connectionError ? (
        <ErrorContainer>
          <span>
            Não foi possível carregar os dados da página devido a instabilidade na conexão. Por
            favor, tente novamente.
          </span>
        </ErrorContainer>
      ) : (
        <List items={data} serviceData={ServiceData[0]} />
      )}
    </Container>
  );
}
