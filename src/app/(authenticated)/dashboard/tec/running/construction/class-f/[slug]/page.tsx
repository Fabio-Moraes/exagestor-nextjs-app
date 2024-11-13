'use client';

import { useEffect, useState } from 'react';

import { FullScreenLoading } from 'components/FullScreenLoading';
import { LineSkaleton } from 'components/LineSkaleton';
import Image from 'components/Vercel/Image';
import { decryptObject } from 'functions';
import { copyToClipboard } from 'functions/CopyToClipboard';
import { HandleLogout } from 'functions/HandleLogout';
import { TimedWait } from 'functions/TimedWait';
import { internalApi } from 'services/apiAxios';

import { v4 as uuidv4 } from 'uuid';

import eyeCopy from '../_assets/svg/copy.svg';
import eyeClosed from '../_assets/svg/eye-closed.svg';
import eyeOpen from '../_assets/svg/eye-open.svg';

import * as S from './styles';

interface SlugType {
  params: {
    slug: string;
  };
}

type TypeCatalogDgoandbox = {
  id: number;
  description: string;
  node: string;
  status: string;
  type: string;
  created_at: string;
};

type TypeDgoJsonObject = {
  [key: string]: {
    [subKey: string]: {
      value: string;
    };
  };
};

export default function FinishService({ params }: SlugType) {
  const [sharedPassword /*,setSharedPassword */] = useState<Array<{ password?: string }>>([]);
  const [connectionError, setConnectionError] = useState(false);
  const [isPopupValue, setIsPopupValue] = useState<string | null>(null);

  const [selectedTab, setSelectedTab] = useState<string | null>(null);
  const [dgoJsonObject, setDgoJsonObject] = useState({} as TypeDgoJsonObject);

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [catalogDgoandbox, setCatalogDgoandbox] = useState([] as TypeCatalogDgoandbox[]);
  const [nodeName, setNodeName] = useState('');
  //const [isLoading, setIsLoading] = useState(true);

  const decryptSlug = decryptObject(params.slug);

  const maxRetries = 4;

  function generateConnectingMessage(count: number): string {
    return count > 0 ? `Conectando<br>Tentativa (${count + 1})` : 'Conectando';
  }

  async function fetchServices() {
    setConnectionError(false);

    for (let retryCount = 0; retryCount < maxRetries; retryCount++) {
      try {
        setIsPopupValue(generateConnectingMessage(retryCount));

        const response = await internalApi.post('/api/bridge', {
          baseURL: '/api/tec/running/construction/class-f',
          protocol: decryptSlug.protocol?.toString()
        });

        setIsPopupValue(null);
        if (response.data.selectedDgoandbox && response.data.selectedDgoandbox[0]?.list_dgoandbox) {
          const jsonObject = JSON.parse(response.data.selectedDgoandbox[0].list_dgoandbox);
          setDgoJsonObject(jsonObject);

          setNodeName(response.data.selectedDgoandbox[0].node_name);
          setCatalogDgoandbox(response.data.catalogDgoandbox);
          setSelectedTab(Object.keys(jsonObject)[0]);
        }

        //setOperationsCable(response.data.operationsCable);
        //setSharedPassword(response.data.sharedPassword);
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
    /*     const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => {
      clearTimeout(timer);
    }; */
  }, []);

  console.log(catalogDgoandbox);

  return (
    <S.Container>
      <S.Title>
        <h1>SERVIÇOS CLASSE F</h1>
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
            {Object.keys(dgoJsonObject).map((key) => (
              <S.TabButton
                key={`tab-button-${key}`}
                $checked={selectedTab === key}
                onClick={() => setSelectedTab(key)}
              >
                {catalogDgoandbox?.filter((i) => String(i.id) === key)[0].type}
              </S.TabButton>
            ))}
          </S.Tabs>
          <S.List>
            {selectedTab &&
              Object.keys(dgoJsonObject[selectedTab]).map((subKey: string) => (
                <button key={uuidv4()}>
                  <p>{catalogDgoandbox?.filter((i) => String(i.id) === selectedTab)[0].type}.</p>
                  <p>
                    {catalogDgoandbox?.filter((i) => String(i.id) === selectedTab)[0].node ===
                      'defined' && `${nodeName}.`}
                  </p>
                  <p>{String(dgoJsonObject[selectedTab][subKey]?.value)}</p>
                </button>
              ))}
          </S.List>
        </>
      )}
    </S.Container>
  );
}
