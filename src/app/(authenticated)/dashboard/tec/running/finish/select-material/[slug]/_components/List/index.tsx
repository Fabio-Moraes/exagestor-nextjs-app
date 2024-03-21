'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { FullScreenLoading } from 'components/FullScreenLoading';
import { LineSkaleton } from 'components/LineSkaleton';
import Image from 'components/Vercel/Image';
import { encryptObject } from 'functions';
import { TimedWait } from 'functions/TimedWait';
import { useLocalStorage } from 'contexts/localStorage';
import apiRoute from 'services/apiRoute';

import { ListItem } from '../ListItem';

import { motion, AnimatePresence } from 'framer-motion';

import infoSvg from './_assets/svg/info.svg';
import searchSvg from './_assets/svg/search.svg';

import {
  Button,
  ItemsSkeleton,
  ListContainer,
  SearchBar,
  SearchWrapper,
  ErrorContainer
} from './styles';

interface ServiceData {
  id: number;
  client_name: string;
  city: string;
  address: string;
  nomenclature: string;
  classification: string;
  status: string;
  update_count: number;
  created_at: string;
  protocol: string;
}

interface Materials {
  id: number;
  product_name: string;
  unit_type: string;
  product_code: string;
  quantity_value: string;
  created_at: string;
}

export function List(props: { serviceData: ServiceData }) {
  const { serviceData } = props;

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showSelected, setShowSelected] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  const { selectMaterial, setSelectMaterial } = useLocalStorage();

  const [materials, setMaterials] = useState<Materials[]>([]);
  const [connectionError, setConnectionError] = useState(false);
  const [isPopupValue, setIsPopupValue] = useState<string | null>(null);

  function generateConnectingMessage(count: number): string {
    return count > 0 ? `Conectando<br>Tentativa (${count + 1})` : 'Conectando';
  }

  const maxRetries = 4;

  async function fetchMaterials() {
    setConnectionError(false);

    for (let retryCount = 0; retryCount < maxRetries; retryCount++) {
      try {
        setIsPopupValue(generateConnectingMessage(retryCount));

        const responseDataUser = await apiRoute.post('/api/user');
        const responseDataStock = await apiRoute.post('/api/bridge', {
          baseURL: '/api/tec/stock',
          employee_id: Number(responseDataUser.data.id)
        });

        setIsPopupValue(null);
        setMaterials(responseDataStock.data);
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
    fetchMaterials();

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const router = useRouter();

  async function fetchConcludedMaterial() {
    const encryptSlug = encryptObject({ protocol: serviceData?.protocol });
    router.push(`/dashboard/tec/running/finish/observation-box/${encryptSlug}`);
  }

  const counterItems = (item: Materials, count: number) => {
    const maxCouter = Number(materials.find((obj) => obj.id === item.id)?.quantity_value);

    setSelectMaterial((prevItems) => {
      const protocolKey = String(serviceData?.protocol);

      return {
        ...prevItems,
        [protocolKey]: {
          ...(prevItems[protocolKey] || {}),
          [String(item.id)]: count > maxCouter ? maxCouter : count
        }
      };
    });
  };

  const toggleItemReset = (item: string) => {
    setSelectMaterial((prevItems) => {
      const updatedItems = { ...prevItems };
      const protocolKey = String(serviceData?.protocol);

      if (updatedItems[protocolKey] && updatedItems[protocolKey].hasOwnProperty(item)) {
        const selectedItemsCount = Object.keys(updatedItems[protocolKey]).length;

        if (selectedItemsCount > 1) {
          delete updatedItems[protocolKey][item];
        } else {
          delete updatedItems[protocolKey];
        }
      }

      return updatedItems;
    });
  };

  const selectServiceClean = () => {
    setSelectMaterial((prevItems) => {
      const updatedItems = { ...prevItems };
      const protocolKey = String(serviceData?.protocol);

      if (updatedItems.hasOwnProperty(protocolKey)) {
        delete updatedItems[protocolKey];
      }

      return updatedItems;
    });
  };

  const filteredItems = materials?.filter(
    (item) =>
      item.product_name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (showSelected ? selectMaterial[String(serviceData?.protocol)]?.[item.id] : true)
  );

  const selectedItemKeys = Object.keys(selectMaterial[String(serviceData?.protocol)] || {});

  return (
    <>
      {isPopupValue && <FullScreenLoading message={isPopupValue} />}
      {connectionError ? (
        <ErrorContainer>
          <span>
            Não foi possível carregar os dados da página devido a instabilidade na conexão. Por
            favor, tente novamente.
          </span>
        </ErrorContainer>
      ) : (
        <ListContainer>
          <AnimatePresence>
            <div>
              <SearchWrapper>
                <Image priority src={searchSvg} alt="Book" width={25} height={25} />
                <SearchBar
                  type="text"
                  placeholder="Pesquisar serviço..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </SearchWrapper>
              <div>
                <div>
                  <Button onClick={() => setShowSelected(!showSelected)}>
                    {showSelected
                      ? 'Mostrar Todos'
                      : `Filtrar Selecionado${selectedItemKeys.length > 1 ? 's' : ''} (${
                          selectedItemKeys.length
                        })`}
                  </Button>

                  <Button onClick={selectServiceClean}>Limpar</Button>
                </div>
                <Image priority src={infoSvg} alt="Add" width={30} height={30} />
              </div>
            </div>
            {isLoading
              ? [...Array(8)].map((_, index) => {
                  return (
                    <ItemsSkeleton key={String(index)}>
                      <LineSkaleton height="3rem" width="3.5rem" />
                      <LineSkaleton height="3rem" />
                    </ItemsSkeleton>
                  );
                })
              : filteredItems.map((item) => (
                  <motion.ul
                    key={item.product_name}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                  >
                    <ListItem
                      key={item.product_name}
                      item={item}
                      count={selectMaterial?.[String(serviceData?.protocol)]?.[item.id]}
                      onSelect={({ count }) => {
                        counterItems(item, count);
                      }}
                      onReset={() => toggleItemReset(String(item.id))}
                    />
                  </motion.ul>
                ))}
          </AnimatePresence>
          <div>
            <Button onClick={() => router.back()}>Voltar</Button>
            <Button onClick={() => fetchConcludedMaterial()}>Avançar</Button>
          </div>
        </ListContainer>
      )}
    </>
  );
}
