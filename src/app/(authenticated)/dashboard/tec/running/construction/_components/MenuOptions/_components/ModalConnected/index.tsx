'use client';

import type React from 'react';
import { type RefObject, useEffect, useState } from 'react';

import { FullScreenLoading } from 'components/FullScreenLoading';
import { HandleLogout } from 'functions/HandleLogout';
import { TimedWait } from 'functions/TimedWait';
import { internalApi } from 'services/apiAxios';

import * as S from './styles';

type ModalConnectedProps = {
  dialogRef: RefObject<HTMLDialogElement>;
  protocol?: string;
};

type ConnectedData = { name: string };

export function ModalConnected(props: ModalConnectedProps) {
  const [connectedData, setConnectedData] = useState([] as ConnectedData[]);
  const [isPopupValue, setIsPopupValue] = useState<string | null>(null);

  const { dialogRef, protocol } = props;
  const maxRetries = 4;

  function generateConnectingMessage(count: number): string {
    return count > 0 ? `Conectando<br>Tentativa (${count + 1})` : 'Conectando';
  }

  async function fetchServices() {
    for (let retryCount = 0; retryCount < maxRetries; retryCount++) {
      try {
        setIsPopupValue(generateConnectingMessage(retryCount));

        const response = await internalApi.post<ConnectedData[]>('/api/bridge', {
          baseURL: '/api/tec/running/construction/connected',
          protocol: Number(protocol)
        });

        setConnectedData(response.data);

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
    /*     const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => {
      clearTimeout(timer);
    }; */
  }, []);

  const handleClickOutsideDialog = (event: React.MouseEvent<HTMLDialogElement>) => {
    if (dialogRef.current) {
      const rect = dialogRef.current.getBoundingClientRect();
      const { clientX, clientY } = event;
      if (clientX < rect.left || clientX > rect.right || clientY < rect.top || clientY > rect.bottom) {
        dialogRef.current.close();
      }
    }
  };

  return (
    <>
      <S.Dialog ref={dialogRef} onClick={handleClickOutsideDialog}>
        <div>{connectedData?.map((i, index) => <p key={String(index)}>• {i?.name}</p>)}</div>
      </S.Dialog>
      {isPopupValue && <FullScreenLoading message={isPopupValue} />}
    </>
  );
}
