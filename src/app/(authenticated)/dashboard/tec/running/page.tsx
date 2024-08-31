'use client';

import { useEffect, useState } from 'react';

import { Card } from './_components/Card';
import { FullScreenLoading } from 'components/FullScreenLoading';
//import Image from 'components/Vercel/Image';
import { HandleLogout } from 'functions/HandleLogout';
import { TimedWait } from 'functions/TimedWait';
import { internalApi } from 'services/apiAxios';

import { useLocalStorage } from 'contexts/localStorage';
import { useWebSocket } from 'contexts/webSocket';

//import connectSvg from './_assets/svg/connect.svg';

import * as S from './styles';

interface RunningService {
  id: number;
  employee_id: number;
  client_name: string;
  city: string;
  address: string;
  nomenclature: string;
  classification: string;
  update_count: number;
  status: string;
  start_service_at: string;
  created_at: string;
  protocol: string;
  name_creator_leader: string;
  name_tec: string;
  type_operation: string;
}

interface Protocol {
  [key: string]: { [key: string]: number };
}

export default function RunningService() {
  const [runningService, setRunningService] = useState<RunningService[]>([]);
  const [runningServiceShared, setRunningServiceShared] = useState<RunningService[]>([]);
  const [connectionError, setConnectionError] = useState(false);
  const [isPopupValue, setIsPopupValue] = useState<string | null>(null);
  const [pin, setPin] = useState('');

  const { setSelectService, setSelectMaterial } = useLocalStorage();

  const socket = useWebSocket();

  function filterSelectedOpenProtocols(services: RunningService[]) {
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

  const maxRetries = 6;

  function generateConnectingMessage(count: number): string {
    return count > 0 ? `Conectando<br>Tentativa (${count + 1})` : 'Conectando';
  }

  const fetchServices = async () => {
    setConnectionError(false);

    for (let retryCount = 0; retryCount < maxRetries; retryCount++) {
      try {
        setIsPopupValue(generateConnectingMessage(retryCount));

        const response = await internalApi.post('/api/bridge', {
          baseURL: '/api/tec/running'
        });

        setIsPopupValue(null);
        filterSelectedOpenProtocols(response.data.runningService);
        setRunningService(response.data.runningService);
        setRunningServiceShared(response.data.runningServiceShared);
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
  };

  const refreshFetchServices = async () => {
    const response = await internalApi.post('/api/decode/auth_token');
    if (socket) {
      socket.on(`RUNNING_REFRESH_TEC:${response.data.id}`, async () => {
        await fetchServices();
      });
    }
  };

  useEffect(() => {
    refreshFetchServices();
  }, [socket]);

  useEffect(() => {
    fetchServices();
  }, []);

  async function fetchConnectShared() {
    //setRunningLoad(true);
    for (let retryCount = 0; retryCount < maxRetries; retryCount++) {
      try {
        await internalApi.post('/api/bridge', {
          baseURL: '/api/tec/running/connect-shared',
          password: pin
        });
        window.location.reload();
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
            } else {
              await TimedWait(3000);
            }
          }
        }
      } finally {
        //setRunningLoad(false);
      }
    }
  }

  return (
    <S.Container>
      <S.Title>Em Execução</S.Title>
      {isPopupValue && <FullScreenLoading message={isPopupValue} />}
      {connectionError ? (
        <S.ErrorContainer>
          <span>
            Não foi possível carregar os dados da página devido a instabilidade na conexão. Por
            favor, tente novamente.
          </span>
          <button onClick={() => fetchServices()}>Tentar Novamente</button>
        </S.ErrorContainer>
      ) : (
        <S.ListContainer>
          <S.BoxButton>
            <span>Serviço Compartilhado</span>
            <div>
              <S.Input
                type="text"
                id="boxOrCableNomenclature"
                placeholder="PIN"
                value={pin}
                onChange={(e) => setPin(e.target.value.toUpperCase().replace(/\s/g, ''))}
              />
              <S.Button onClick={fetchConnectShared}>Conectar</S.Button>
            </div>
          </S.BoxButton>
          {true && (
            <>
              {runningServiceShared.map(
                (service, index) =>
                  index === 0 && (
                    <div key={String(index)}>
                      <Card service={service} shared={true} />
                    </div>
                  )
              )}
            </>
          )}
          {runningService.map((service, index) => (
            <div key={String(index)}>
              <Card service={service} />
            </div>
          ))}
        </S.ListContainer>
      )}
    </S.Container>
  );
}
