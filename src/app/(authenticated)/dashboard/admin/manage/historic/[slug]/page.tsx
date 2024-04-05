'use client';

import { useEffect, useState } from 'react';

import { Card } from './_components/Card';
import { FullScreenLoading } from 'components/FullScreenLoading';
import Image from 'components/Vercel/Image';
import { decryptObject } from 'functions';
import { TimedWait } from 'functions/TimedWait';
import apiRoute from 'services/apiRoute';

import * as animationData from './_assets/lottie/animation.json';

import { Player } from '@lottiefiles/react-lottie-player';
import { v4 as uuidv4 } from 'uuid';

import down from './_assets/svg/down.svg';

import { Container, ErrorContainer, ListContainer, ListItem, Title, Spinner } from './styles';

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
  created_at: string;
  modification_at: string;
  finished_at: string;
  observation: string;
  protocol: string;
}

interface SlugType {
  params: {
    slug: string;
  };
}

interface DecryptObjectType {
  userId?: number;
  userName?: string;
  employee_all?: boolean;
}

export default function GeneralHistoric({ params }: SlugType) {
  const [services, setServices] = useState<Service[]>([]);
  const [spinner, setSpineer] = useState(false);
  const [connectionError, setConnectionError] = useState(false);
  const [isPopupValue, setIsPopupValue] = useState<string | null>(null);

  const { userId, userName, employee_all } = decryptObject(params.slug) as DecryptObjectType;

  const maxRetries = 4;

  function generateConnectingMessage(count: number): string {
    return count > 0 ? `Conectando<br>Tentativa (${count + 1})` : 'Conectando';
  }

  async function fetchServices() {
    setConnectionError(false);

    for (let retryCount = 0; retryCount < maxRetries; retryCount++) {
      try {
        setIsPopupValue(generateConnectingMessage(retryCount));
        setSpineer(true);
        await TimedWait(500);

        const response = await apiRoute.post('/api/bridge', {
          baseURL: '/api/admin/manage/historic',
          employee_id: userId,
          employee_all: employee_all,
          initial_id: services.length >= 1 ? services[services.length - 1].id : null
        });

        setServices((res) => [...res, ...response.data]);
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
      } finally {
        setSpineer(false);
      }
    }
  }

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <Container>
      <Title>Histórico Geral {userName && `- ${userName}`}</Title>
      <ListContainer>
        {services.map((service) => (
          <ListItem key={uuidv4()}>
            <Card service={service} />
          </ListItem>
        ))}

        {services.length >= 1 &&
          (spinner ? (
            <Spinner>
              <div>
                <Player
                  src={animationData}
                  loop
                  autoplay
                  speed={1.5}
                  style={{ height: '7rem', width: '7rem' }}
                />
              </div>
            </Spinner>
          ) : (
            <button onClick={fetchServices}>
              <div>
                <p>Mais resultados</p>
                <Image priority loading="eager" src={down} alt="Add" width="25" height="25" />
              </div>
            </button>
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
