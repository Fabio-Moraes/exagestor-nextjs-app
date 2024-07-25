'use client';

import { useState } from 'react';

import { FullScreenLoading } from 'components/FullScreenLoading';
import { HandleLogout } from 'functions/HandleLogout';
import { TimedWait } from 'functions/TimedWait';
import { internalApi } from 'services/apiAxios';

import * as S from './styles';

export function DisconnectEverything() {
  const [isPopupValue, setIsPopupValue] = useState<string | null>(null);

  const maxRetries = 4;

  function generateConnectingMessage(count: number): string {
    return count > 0 ? `Conectando<br>Tentativa (${count + 1})` : 'Conectando';
  }

  async function fetchClient() {
    for (let retryCount = 0; retryCount < maxRetries; retryCount++) {
      try {
        setIsPopupValue(generateConnectingMessage(retryCount));

        await internalApi.post('/api/bridge', {
          baseURL: '/api/config/disconnect-everything'
        });

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
            } else {
              await TimedWait(3000);
            }
          }
        }
      }
    }
  }

  return (
    <>
      {isPopupValue && <FullScreenLoading message={isPopupValue} />}
      <S.BoxButton>
        <S.Button type="button" onClick={() => fetchClient()}>
          <span>
            Desconectar <br /> todas as contas
          </span>
        </S.Button>
      </S.BoxButton>
    </>
  );
}
