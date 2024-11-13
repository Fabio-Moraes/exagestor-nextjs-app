'use client';

import React, { useEffect, useState } from 'react';

import { FullScreenLoading } from 'components/FullScreenLoading';
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

type OperationsCableData = {
  id: number;
  description: string;
  cable_length_meters: number;
  adequacy_length_meters: number;
  created_at: string;
  name_tec: string;
  protocol: string;
};

function formatDate(date: string) {
  const now = new Date(date);
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

export default function NewStock({ params }: SlugType) {
  const [connectionError, setConnectionError] = useState(false);
  const [isPopupValue, setIsPopupValue] = useState<string | null>(null);
  const [dataHistoric, setDataHistoric] = useState([] as OperationsCableData[]);
  const [selectedTab, setSelectedTab] = useState('CABLE_LENGTH');

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
          baseURL: '/api/tec/running/construction/class-l/historic',
          protocol: decryptSlug.protocol?.toString()
        });

        setDataHistoric(response.data.historicCableOperations);
        console.log('-----', response.data.historicCableOperations);
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
    <>
      <S.Container>
        <S.Title>Histórico</S.Title>
        {isPopupValue && <FullScreenLoading message={isPopupValue} />}
        {connectionError ? (
          <S.ErrorContainer>
            <span>
              Não foi possível carregar os dados da página devido a instabilidade na conexão. Por favor,
              tente novamente.
            </span>
          </S.ErrorContainer>
        ) : (
          <>
            <S.Tabs>
              <S.TabButton
                $checked={Boolean(selectedTab === 'CABLE_LENGTH')}
                onClick={() => {
                  setSelectedTab('CABLE_LENGTH');
                }}
              >
                Lançamento
              </S.TabButton>
              <S.TabButton
                $checked={Boolean(selectedTab === 'ADEQUACY_LENGTH')}
                onClick={() => {
                  setSelectedTab('ADEQUACY_LENGTH');
                }}
              >
                Adequação
              </S.TabButton>
              <S.TabButton
                $checked={Boolean(selectedTab === 'TECHNICAL_RESERVE')}
                onClick={() => {
                  setSelectedTab('TECHNICAL_RESERVE');
                }}
              >
                Reserva Técnica
              </S.TabButton>
            </S.Tabs>
            <S.ContainerCard>
              {selectedTab === 'TECHNICAL_RESERVE' && (
                <S.Card>
                  <p>EM DESENVOLVIMENTO</p>
                </S.Card>
              )}
              {dataHistoric?.map((service, index) => {
                if (service.adequacy_length_meters <= 0 && selectedTab === 'CABLE_LENGTH') {
                  return (
                    <S.Card key={`historic-class-l-${index}`}>
                      <p>{service.name_tec}</p>
                      <span>CABO LANÇADO: {service.cable_length_meters}</span>
                      <span>{formatDate(service.created_at)}</span>
                    </S.Card>
                  );
                }

                if (service.adequacy_length_meters > 0 && selectedTab === 'ADEQUACY_LENGTH') {
                  return (
                    <S.Card key={`historic-class-l-${index}`}>
                      <p>{service.name_tec}</p>
                      <span>CABO ADEQUADOS: {service.adequacy_length_meters}</span>
                      <span>{formatDate(service.created_at)}</span>
                    </S.Card>
                  );
                }

                //return <div>B{service.name_tec}</div>;
              })}
            </S.ContainerCard>
          </>
        )}
      </S.Container>
    </>
  );
}
