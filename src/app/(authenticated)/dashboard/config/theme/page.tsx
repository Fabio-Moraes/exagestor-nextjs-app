'use client';

import { useEffect, useState } from 'react';

import { FullScreenLoading } from 'components/FullScreenLoading';
import { TimedWait } from 'functions/TimedWait';
import { internalApi } from 'services/apiAxios';

import * as S from './styles';

export default function Settings() {
  const [businessData, setBusinessData] = useState('');
  const [connectionError, setConnectionError] = useState(false);

  const [isPopupValue, setIsPopupValue] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  console.log(isLoading);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const maxRetries = 4;

  function generateConnectingMessage(count: number): string {
    return count > 0 ? `Conectando<br>Tentativa (${count + 1})` : 'Conectando';
  }

  async function fetchServices(bussines?: string) {
    setConnectionError(false);

    for (let retryCount = 0; retryCount < maxRetries; retryCount++) {
      try {
        setIsPopupValue(generateConnectingMessage(retryCount));

        const response = await internalApi.post('/api/bridge', {
          baseURL: '/api/config/theme',
          bussines
        });

        setIsPopupValue(null);
        setBusinessData(response.data);
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
    <S.Container>
      <S.Title>Gerenciar Tema</S.Title>
      {isPopupValue && <FullScreenLoading message={isPopupValue} />}
      {connectionError ? (
        <S.ErrorContainer>
          <span>
            Não foi possível carregar os dados da página devido a instabilidade na conexão. Por
            favor, tente novamente.
          </span>
        </S.ErrorContainer>
      ) : (
        <S.CheckBoxWrapper>
          <S.CheckboxButton
            type="button"
            $checked={businessData === 'exatelecom'}
            onClick={() => {
              fetchServices('exatelecom');
            }}
          >
            <div />
            <span>Exatelecom</span>
          </S.CheckboxButton>

          <S.CheckboxButton
            type="button"
            $checked={businessData === 'wmax'}
            onClick={() => {
              fetchServices('wmax');
            }}
          >
            <div />
            <span>Wmax</span>
          </S.CheckboxButton>
        </S.CheckBoxWrapper>
      )}
    </S.Container>
  );
}
