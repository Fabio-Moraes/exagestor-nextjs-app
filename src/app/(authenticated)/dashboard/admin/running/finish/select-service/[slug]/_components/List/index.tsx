'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { LineSkaleton } from 'components/LineSkaleton';
import Image from 'components/Vercel/Image';
import { encryptObject } from 'functions';

import { ListItem } from '../ListItem';

import { useLocalStorage } from 'contexts/localStorage';
import { motion, AnimatePresence } from 'framer-motion';

import infoSvg from './_assets/svg/info.svg';
import searchSvg from './_assets/svg/search.svg';

import * as S from './styles';

interface ListProps {
  id: string;
  description: string;
}

interface ServiceData {
  id: number;
  client_name: string;
  employee_id: string;
  city: string;
  address: string;
  nomenclature: string;
  classification: string;
  status: 'analysis' | 'active' | 'paused';
  start_service_at: string;
  update_count: number;
  created_at: string;
  modification_at: string;
  finished_at: string;
  list_material: string;
  list_service: string;
  observation: string;
  protocol: string;
}

export function List(props: { serviceData: ServiceData; items: ListProps[] }) {
  const { serviceData, items } = props;

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showSelected, setShowSelected] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  const { selectService, setSelectService, setSelectMaterial } = useLocalStorage();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const router = useRouter();

  async function fetchConcludedServices() {
    const encryptSlug = encryptObject({
      protocol: serviceData?.protocol,
      employeeId: serviceData?.employee_id
    });
    router.push(`/dashboard/admin/running/finish/select-material/${encryptSlug}`, {
      scroll: false
    });
  }

  const toggleItem = (item: string, count: number) => {
    setSelectService((prevItems) => {
      const protocolKey = String(serviceData?.protocol);

      if (item === '2') {
        console.log('TEST-SELECT-MATERIAL', item);
        setSelectMaterial((prevItems) => {
          const protocolKey = String(serviceData?.protocol);

          return {
            ...prevItems,
            [protocolKey]: {
              ...(prevItems[protocolKey] || {}) //, ['4']: count * 3, ['2']: count * 2
            }
          };
        });
      }

      return {
        ...prevItems,
        [protocolKey]: {
          ...(prevItems[protocolKey] || {}),
          [item]: count
        }
      };
    });
  };

  const toggleItemReset = (item: string) => {
    setSelectService((prevItems) => {
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
    setSelectService((prevItems) => {
      const updatedItems = { ...prevItems };
      const protocolKey = String(serviceData?.protocol);

      if (updatedItems.hasOwnProperty(protocolKey)) {
        delete updatedItems[protocolKey];
      }

      return updatedItems;
    });
  };

  const filteredItems = items?.filter(
    (item) =>
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (showSelected ? selectService[String(serviceData?.protocol)]?.[item.id] : true)
  );

  const objListService = JSON.parse(serviceData?.list_service || '{}');
  const protocolKey = String(serviceData?.protocol);

  useEffect(() => {
    if (Object.keys(objListService).length !== 0) {
      setSelectService((prevItems) => {
        return {
          ...prevItems,
          [protocolKey]: objListService
        };
      });
    }
  }, [protocolKey]);

  const selectedItemKeys = Object.keys(selectService[String(serviceData?.protocol)] || {});

  return (
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
              <S.Button onClick={() => setShowSelected(!showSelected)}>
                {showSelected
                  ? 'Mostrar Todos'
                  : `Filtrar Selecionado${selectedItemKeys.length > 1 ? 's' : ''} (${
                      selectedItemKeys.length
                    })`}
              </S.Button>

              <S.Button onClick={selectServiceClean}>Limpar</S.Button>
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
          : filteredItems.map((item) => (
              <motion.ul
                key={item.description}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
              >
                <ListItem
                  key={item.description}
                  item={item.description}
                  count={selectService?.[String(serviceData?.protocol)]?.[item.id]}
                  onSelect={({ count }) => {
                    serviceData?.status !== 'analysis' && toggleItem(item.id, count);
                  }}
                  onReset={() =>
                    serviceData?.status !== 'analysis' && toggleItemReset(item.id)
                  }
                />
              </motion.ul>
            ))}
      </AnimatePresence>
      <div>
        <S.Button rel="preload" onClick={() => router.back()}>
          Voltar
        </S.Button>
        <S.Button rel="preload" onClick={() => fetchConcludedServices()}>
          Avançar
        </S.Button>
      </div>
    </S.ListContainer>
  );
}
