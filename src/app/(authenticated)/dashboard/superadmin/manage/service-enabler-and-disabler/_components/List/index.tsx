'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { FullScreenLoading } from 'components/FullScreenLoading';
import { LineSkaleton } from 'components/LineSkaleton';
import Image from 'components/Vercel/Image';
import { TimedWait } from 'functions/TimedWait';
import { internalApi } from 'services/apiAxios';

import { ListItem } from '../ListItem';

import { motion, AnimatePresence } from 'framer-motion';

import infoSvg from './_assets/svg/info.svg';
import searchSvg from './_assets/svg/search.svg';

import * as S from './styles';

type ServiceData = {
  id: number;
  description: string;
  status: 'ativo' | 'inativo';
  created_at: string;
  observation: string;
};

type FetchService = {
  modificationId?: string;
  status?: 'ativo' | 'inativo';
};

export function List() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showSelected, setShowSelected] = useState<boolean>(false);
  const [serviceData, setServiceData] = useState([] as ServiceData[]);
  const [connectionError, setConnectionError] = useState(false);
  const [isPopupValue, setIsPopupValue] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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

  async function fetchServices(props: FetchService) {
    const { modificationId, status } = props;

    setConnectionError(false);

    for (let retryCount = 0; retryCount < maxRetries; retryCount++) {
      try {
        setIsPopupValue(generateConnectingMessage(retryCount));

        const response = await internalApi.post('/api/bridge', {
          baseURL: '/api/superadmin/manage/service-enabler-and-disabler',
          modificationId,
          status
        });

        setIsPopupValue(null);
        setServiceData(response.data);
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
    fetchServices({});
  }, []);

  const router = useRouter();

  const filteredItems = serviceData?.filter(
    (item) =>
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (showSelected ? item.status === 'inativo' : true)
  );

  return (
    <>
      {isPopupValue && <FullScreenLoading message={isPopupValue} />}
      {connectionError ? (
        <S.ErrorContainer>
          <span>
            Não foi possível carregar os dados da página devido a instabilidade na conexão. Por
            favor, tente novamente.
          </span>
        </S.ErrorContainer>
      ) : (
        <S.ListContainer>
          <AnimatePresence>
            <div>
              <S.SearchWrapper>
                <Image priority src={searchSvg} alt="Book" width={25} height={25} />
                <S.SearchBar
                  type="text"
                  placeholder="Pesquisar serviço..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </S.SearchWrapper>
              <div>
                <div>
                  <S.Button onClick={() => setShowSelected((show) => !show)}>
                    {showSelected
                      ? 'Mostrar Todos'
                      : `Filtrar Inativo${
                          serviceData.filter((services) => services.status === 'inativo')
                            .length > 1
                            ? 's'
                            : ''
                        } (${
                          serviceData.filter((services) => services.status === 'inativo')
                            .length
                        })`}
                  </S.Button>
                </div>
                <Image priority src={infoSvg} alt="Add" width={30} height={30} />
              </div>
            </div>
            {isLoading
              ? [...Array(8)].map((_, index) => {
                  return (
                    <S.ItemsSkeleton key={String(index)}>
                      <LineSkaleton height="3rem" width="3.5rem" />
                      <LineSkaleton height="3rem" />
                    </S.ItemsSkeleton>
                  );
                })
              : filteredItems?.map((item, index) => (
                  <motion.ul
                    key={item.description}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                  >
                    <ListItem
                      onClickButton={(i) => {
                        fetchServices(i);
                      }}
                      key={index}
                      item={item}
                    />
                  </motion.ul>
                ))}
          </AnimatePresence>
          <div>
            <S.Button rel="preload" onClick={() => router.back()}>
              Voltar
            </S.Button>
          </div>
        </S.ListContainer>
      )}
    </>
  );
}
