'use client';

import { useEffect, useState } from 'react';

import { Card } from './_components/Card';
import { FullScreenLoading } from 'components/FullScreenLoading';
import { HandleLogout } from 'functions/HandleLogout';
import { TimedWait } from 'functions/TimedWait';
import { internalApi } from 'services/apiAxios';

import * as S from './styles';

interface Material {
  id: number;
  product_name: string;
  name_tec: string;
  name_role: string;
  unit_type: string;
  product_code: string;
  quantity_value: string;
  category: string;
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

        const response = await internalApi.post('/api/bridge', {
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
  }, []);

  return (
    <S.Container>
      <S.Title>Histórico Geral</S.Title>
      <S.ListContainer>
        {material.map((material) => (
          <S.ListItem key={material.id}>
            <Card material={material} />
          </S.ListItem>
        ))}
      </S.ListContainer>
      {isPopupValue && <FullScreenLoading message={isPopupValue} />}
      {connectionError && !isPopupValue && (
        <S.ErrorContainer>
          <span>
            Não foi possível obter dados da lista devido a instabilidade na conexão. Por favor,
            tente novamente.
          </span>
          <button onClick={() => fetchServices()}>Tentar Novamente</button>
        </S.ErrorContainer>
      )}
    </S.Container>
  );
}
