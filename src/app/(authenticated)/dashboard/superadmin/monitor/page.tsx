'use client';

import { useEffect, useState } from 'react';

import { ChartComponent } from './_components/Graphic';
import { IndexColors } from './_components/indexColors';
import { FullScreenLoading } from 'components/FullScreenLoading';
import Image from 'components/Vercel/Image';
import { TimedWait } from 'functions/TimedWait';
import { internalApi } from 'services/apiAxios';

import * as animationData from './_assets/lottie/animation.json';

import { Player } from '@lottiefiles/react-lottie-player';

import arrowLeft from './_assets/svg/arrowLeft.svg';
import arrowRight from './_assets/svg/arrowRight.svg';
import refresh from './_assets/svg/refresh.svg';

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

type ServicesType = { startIndex: number; data: Service[] };

export default function GeneralMonitoring() {
  const [services, setServices] = useState<ServicesType>({ startIndex: 0, data: [] });
  const [spinner, setSpineer] = useState(false);
  const [connectionError, setConnectionError] = useState(false);
  const [isPopupValue, setIsPopupValue] = useState<string | null>(null);

  const maxRetries = 4;

  function generateConnectingMessage(count: number): string {
    return count > 1 ? `Conectando<br>Tentativa (${count})` : 'Conectando';
  }

  async function fetchServices(startIndex: number | null = null) {
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
          initial_id: startIndex
        });

        setServices((res) => {
          if (startIndex) {
            return { startIndex: res.data.length, data: [...res.data, ...response.data] };
          } else {
            return { startIndex: 0, data: response.data };
          }
        });

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
        <ChartComponent
          services={services.data.slice(services.startIndex, services.startIndex + 10)}
        />
        <S.ButtonContainer>
          <IndexColors />

          {services.data.length >= 1 && spinner && (
            <S.Spinner
              style={{
                margin: '0rem 0rem 0rem 0rem',
                width: '100%'
              }}
            >
              <div>
                <Player
                  src={animationData}
                  loop
                  autoplay
                  speed={1.5}
                  style={{ height: '5rem', width: '5rem' }}
                />
              </div>
            </S.Spinner>
          )}

          <div>
            <S.WrapperButton>
              <button
                onClick={() => {
                  if (services.startIndex >= 10) {
                    setServices((res) => {
                      return {
                        startIndex: res.startIndex - 10,
                        data: res.data
                      };
                    });
                  }
                }}
              >
                <Image
                  priority
                  loading="eager"
                  src={arrowLeft}
                  alt="Add"
                  width="50"
                  height="50"
                  style={{ opacity: services.startIndex < 10 ? 0.3 : 1 }}
                />
              </button>
              <button
                onClick={() => {
                  if (services.startIndex >= services.data.length - 10) {
                    fetchServices(services.data[services.data.length - 1].id);
                  } else {
                    setServices((res) => {
                      return { startIndex: res.startIndex + 10, data: res.data };
                    });
                  }
                }}
              >
                <Image
                  priority
                  loading="eager"
                  src={arrowRight}
                  alt="Add"
                  width="50"
                  height="50"
                />
              </button>
            </S.WrapperButton>
            <S.WrapperButton style={{ marginLeft: '1rem' }}>
              <button
                onClick={() => {
                  if (services.startIndex < 10) fetchServices();
                }}
              >
                <Image
                  priority
                  loading="eager"
                  src={refresh}
                  alt="Add"
                  width="50"
                  height="50"
                  style={{ opacity: services.startIndex >= 10 ? 0.3 : 1 }}
                />
              </button>
            </S.WrapperButton>
          </div>
        </S.ButtonContainer>
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
