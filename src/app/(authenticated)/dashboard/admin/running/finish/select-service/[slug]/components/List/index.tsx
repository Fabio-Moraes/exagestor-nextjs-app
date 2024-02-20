'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { LineSkaleton } from 'components/LineSkaleton';
import Image from 'components/Vercel/Image';
import { encryptObject } from 'functions';
import { useContexState } from 'hooks/useGlobalContext';

import { ListItem } from '../ListItem';

import { motion, AnimatePresence } from 'framer-motion';

import infoSvg from './assets/svg/info.svg';
import searchSvg from './assets/svg/search.svg';

import { Button, ItemsSkeleton, ListContainer, SearchBar, SearchWrapper } from './styles';

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
  status: string;
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

  const { selectService, setSelectService, setSelectMaterial } = useContexState();

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
    router.push(`/dashboard/admin/running/finish/select-material/${encryptSlug}`);
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
                  <LineSkaleton height="30px" width="35px" />
                  <LineSkaleton height="30px" />
                </ItemsSkeleton>
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
                    toggleItem(item.id, count);
                  }}
                  onReset={() => toggleItemReset(item.id)}
                />
              </motion.ul>
            ))}
      </AnimatePresence>
      <div>
        <Button rel="preload" onClick={() => router.back()}>
          Voltar
        </Button>
        <Button rel="preload" onClick={() => fetchConcludedServices()}>
          Avançar
        </Button>
      </div>
    </ListContainer>
  );
}
