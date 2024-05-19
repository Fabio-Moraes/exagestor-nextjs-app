'use client';

import { useEffect, useState } from 'react';

import { ChartComponent } from './_components/Graphic';
import { IndexColors } from './_components/indexColors';
import { FullScreenLoading } from 'components/FullScreenLoading';
import { TimedWait } from 'functions/TimedWait';
import { internalApi } from 'services/apiAxios';

import * as animationData from './_assets/lottie/animation.json';

import { Player } from '@lottiefiles/react-lottie-player';

import * as S from './styles';

interface Service {
  id: number;
  employee_id: number;
  client_name: string;
  name_tec: string;
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
  observation: string;
  protocol: string;
}

export default function GeneralMonitoring() {
  const [services, setServices] = useState<Service[]>([]);
  const [spinner, setSpineer] = useState(false);
  const [connectionError, setConnectionError] = useState(false);
  const [isPopupValue, setIsPopupValue] = useState<string | null>(null);

  const maxRetries = 4;

  function generateConnectingMessage(count: number): string {
    return count > 1 ? `Conectando<br>Tentativa (${count})` : 'Conectando';
  }

  async function fetchServices() {
    setConnectionError(false);

    for (let index = 0; index < maxRetries; index++) {
      try {
        if (index > 0) setIsPopupValue(generateConnectingMessage(index));
        setSpineer(true);
        await TimedWait(300);

        const response = await internalApi.post('/api/bridge', {
          baseURL: '/api/superadmin/manage/historic',
          employee_id: undefined,
          employee_all: true,
          initial_id: services.length >= 1 ? services[services.length - 1].id : null
        });

        setServices(response.data);
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

            if (index === maxRetries) {
              setConnectionError(true);
              setIsPopupValue(null);
            } else {
              await TimedWait(3000);
            }
          }
        }
      } finally {
        setSpineer(false);
      }
    }
  }

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <S.Container>
      <S.ListContainer>
        <ChartComponent services={services} />
        <div></div>
        <S.Button>
          <IndexColors />
          {services.length >= 1 &&
            (spinner ? (
              <S.Spinner>
                <div>
                  <Player
                    src={animationData}
                    loop
                    autoplay
                    speed={1.5}
                    style={{ height: '7rem', width: '7rem' }}
                  />
                </div>
              </S.Spinner>
            ) : (
              <button onClick={fetchServices}>
                <div>
                  <p>Mais resultados</p>
                </div>
              </button>
            ))}
        </S.Button>
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
