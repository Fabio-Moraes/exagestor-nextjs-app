'use client';

import { useEffect, useState } from 'react';

import { FullScreenLoading } from 'components/FullScreenLoading';
import { HandleLogout } from 'functions/HandleLogout';
import { TimedWait } from 'functions/TimedWait';
import { internalApi } from 'services/apiAxios';

import * as S from './styles';

export function SelectTheme() {
  const [businessData, setBusinessData] = useState('');
  const [isPopupValue, setIsPopupValue] = useState<string | null>(null);

  const maxRetries = 4;

  function generateConnectingMessage(count: number): string {
    return count > 0 ? `Conectando<br>Tentativa (${count + 1})` : 'Conectando';
  }

  async function fetchClient(bussines?: string) {
    for (let retryCount = 0; retryCount < maxRetries; retryCount++) {
      try {
        setIsPopupValue(generateConnectingMessage(retryCount));

        const response = await internalApi.post('/api/bridge', {
          baseURL: '/api/config/select-theme',
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
      }
    }
  }

  useEffect(() => {
    fetchClient();
  }, []);

  return (
    <>
      {isPopupValue && <FullScreenLoading message={isPopupValue} />}
      <S.BoxButton>
        <p>Temas</p>
        <S.CheckboxButton
          type="button"
          $checked={businessData === 'exatelecom'}
          onClick={() => {
            fetchClient('exatelecom');
          }}
        >
          <div />
          <span>Exatelecom</span>
        </S.CheckboxButton>

        <S.CheckboxButton
          type="button"
          $checked={businessData === 'wmax'}
          onClick={() => {
            fetchClient('wmax');
          }}
        >
          <div />
          <span>Wmax</span>
        </S.CheckboxButton>
      </S.BoxButton>
    </>
  );
}
