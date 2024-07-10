'use client';

import { useEffect, useState } from 'react';

import { List } from './_components/List';
import { FullScreenLoading } from 'components/FullScreenLoading';
import { LineSkaleton } from 'components/LineSkaleton';
import { decryptObject } from 'functions';
import { TimedWait } from 'functions/TimedWait';
import { internalApi } from 'services/apiAxios';

import * as S from './styles';

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
  start_service_at: string;
  update_count: number;
  created_at: string;
  modification_at: string;
  finished_at: string;
  list_material: string;
  list_service: string;
  observation: string;
  protocol: string;
}

interface Materials {
  id: number;
  product_name: string;
  unit_type: string;
  product_code: string;
  quantity_value: string;
  created_at: string;
}

export default function FinishService({ params }: SlugType) {
  const [serviceData, setServiceData] = useState<ServiceData[]>([]);
  const [connectionError, setConnectionError] = useState(false);
  const [isPopupValue, setIsPopupValue] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [materials, setMaterials] = useState<Materials[]>([]);

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

        const paramDataStock = {
          baseURL: '/api/tec/stock',
          employee_id: Number(decryptSlug.employeeId)
        };

        const responseDataStock = await internalApi.post('/api/bridge', paramDataStock);

        const response = await internalApi.post('/api/bridge', {
          baseURL: '/api/superadmin/running/finish/select-material',
          protocol: decryptSlug.protocol?.toString(),
          employeeId: decryptSlug.employeeId?.toString()
        });

        setMaterials(responseDataStock.data);
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
    <S.Container>
      <S.Title>
        <h1>Materiais</h1>
        {isLoading || !serviceData?.[0]?.protocol ? (
          <LineSkaleton width="30rem" />
        ) : (
          <span>PROTOCOLO: {serviceData[0]?.protocol}</span>
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
        <List items={materials} serviceData={serviceData[0]} />
      )}
    </S.Container>
  );
}
