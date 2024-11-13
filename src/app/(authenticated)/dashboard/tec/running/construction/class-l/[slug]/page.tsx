'use client';

import { useEffect, useState } from 'react';

import { HorizontalList } from '../../_components/HorizontalList';
import { MenuOptions } from '../../_components/MenuOptions';
import { ProgressBar } from '../../_components/ProgressBar';
import { ListServiceCable } from '../../_components/TableList';
import { FullScreenLoading } from 'components/FullScreenLoading';
import { LineSkaleton } from 'components/LineSkaleton';
import Image from 'components/Vercel/Image';
import { decryptObject } from 'functions';
import { copyToClipboard } from 'functions/CopyToClipboard';
import { HandleLogout } from 'functions/HandleLogout';
import { TimedWait } from 'functions/TimedWait';
import { internalApi } from 'services/apiAxios';

import { useWebSocket } from 'contexts/webSocket';

import eyeCopy from '../_assets/svg/copy.svg';
import eyeClosed from '../_assets/svg/eye-closed.svg';
import eyeOpen from '../_assets/svg/eye-open.svg';

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
  protocol: string;
};

type SelectedCableData = {
  id: number;
  protocol: string;
  description: string;
  cable_length_meters: number;
  used_length_meters: number;
  created_at: string;
};

export default function FinishService({ params }: SlugType) {
  const [operationsCable, setOperationsCable] = useState<OperationsCableData[]>([]);
  const [sharedPassword, setSharedPassword] = useState<Array<{ password?: string }>>([]);
  const [selectedCable, setSelectedCable] = useState<SelectedCableData[]>([]);
  const [connectionError, setConnectionError] = useState(false);
  const [isPopupValue, setIsPopupValue] = useState<string | null>(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  //const [isLoading, setIsLoading] = useState(true);

  const maxRetries = 4;
  const decryptSlug = decryptObject(params.slug);
  const socket = useWebSocket();

  function generateConnectingMessage(count: number): string {
    return count > 0 ? `Conectando<br>Tentativa (${count + 1})` : 'Conectando';
  }

  async function fetchServices() {
    setConnectionError(false);

    for (let retryCount = 0; retryCount < maxRetries; retryCount++) {
      try {
        setIsPopupValue(generateConnectingMessage(retryCount));

        const response = await internalApi.post('/api/bridge', {
          baseURL: '/api/tec/running/construction/class-l',
          protocol: decryptSlug.protocol?.toString()
        });

        setIsPopupValue(null);
        setSelectedCable(response.data.selectedCable);
        setOperationsCable(response.data.operationsCable);
        setSharedPassword(response.data.sharedPassword);
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

  const refreshFetchServices = async () => {
    if (socket) {
      console.log('WEBSOCKET PROTOCOL', decryptSlug.protocol?.toString());
      socket.on(`RUNNING_REFRESH_CLASS_L:${decryptSlug.protocol?.toString()}`, async () => {
        await fetchServices();
      });
    }
  };

  useEffect(() => {
    refreshFetchServices();
  }, [socket]);

  useEffect(() => {
    fetchServices();
    /*     const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => {
      clearTimeout(timer);
    }; */
  }, []);

  const selectedCableLength = selectedCable.reduce(
    (accumulator, obj) => accumulator + obj.cable_length_meters,
    0
  );

  const totalsOperationsCable = operationsCable.reduce(
    (accumulator, { cable_length_meters = 0, adequacy_length_meters = 0 }) => {
      accumulator.totalCableLength += cable_length_meters;
      accumulator.totalAdequacyLength += adequacy_length_meters;
      return accumulator;
    },
    { totalCableLength: 0, totalAdequacyLength: 0 }
  );

  return (
    <S.Container>
      <S.Title>
        <h1>SERVIÇOS CLASSE L</h1>
        {
          /* isLoading ||  */ !decryptSlug.protocol?.toString() ? (
            <LineSkaleton width="30rem" />
          ) : (
            <div>
              <span>PROTOCOLO: {decryptSlug.protocol?.toString()}</span>
              {sharedPassword.length !== 0 && (
                <S.Pin>
                  <span>PIN: {passwordVisible ? sharedPassword[0]?.password : '• • • • • • • •'}</span>
                  <div>
                    <button onClick={() => setPasswordVisible((i) => !i)}>
                      <Image
                        priority
                        src={passwordVisible ? eyeOpen : eyeClosed}
                        alt="Icon"
                        width={20}
                        height={20}
                      />
                    </button>
                    <button
                      onClick={async () => {
                        try {
                          await copyToClipboard(sharedPassword[0]?.password ?? '');
                          console.log('Text copied to the clipboard!');
                        } catch (error) {
                          console.error(error);
                        }
                      }}
                    >
                      <Image priority src={eyeCopy} alt="Icon" width={20} height={20} />
                    </button>
                  </div>
                </S.Pin>
              )}
            </div>
          )
        }
      </S.Title>
      <MenuOptions protocol={decryptSlug.protocol?.toString()} />
      <ProgressBar
        description="Lançamento"
        percentage={(totalsOperationsCable.totalCableLength / selectedCableLength) * 100}
      />
      <ProgressBar
        description="Adequação"
        percentage={(totalsOperationsCable.totalAdequacyLength / selectedCableLength) * 100}
      />
      <S.WrapperHorizontalList>
        <HorizontalList selectedCable={selectedCable} />
      </S.WrapperHorizontalList>
      <ListServiceCable serviceCable={operationsCable} />

      {isPopupValue && <FullScreenLoading message={isPopupValue} />}
      {connectionError ? (
        <S.ErrorContainer>
          <span>
            Não foi possível carregar os dados da página devido a instabilidade na conexão. Por favor,
            tente novamente.
          </span>
        </S.ErrorContainer>
      ) : (
        <>{/* <List serviceData={serviceData[0]} /> */}</>
      )}
    </S.Container>
  );
}
