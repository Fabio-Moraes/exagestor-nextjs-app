'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { LineSkaleton } from 'components/LineSkaleton';
import Image from 'components/Vercel/Image';
import { encryptObject } from 'functions';
import { useContexState } from 'hooks/useGlobalContext';

import ListItem from '../ListItem';

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
  city: string;
  address: string;
  nomenclature: string;
  classification: string;
  status: string;
  update_count: number;
  created_at: string;
  protocol: string;
}

export function List(props: { serviceData: ServiceData; items: ListProps[] }) {
  const { serviceData, items } = props;

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showSelected, setShowSelected] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  const { selectMaterial, setSelectMaterial } = useContexState();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Defina o tempo de atraso em milissegundos (neste exemplo, 2 segundos)

    return () => {
      clearTimeout(timer); // Limpar o temporizador se o componente for desmontado antes do tempo limite
    };
  }, []);

  const router = useRouter();

  async function fetchConcludedMaterial() {
    const encryptSlug = encryptObject({ protocol: serviceData?.protocol });
    router.push(`/dashboard/tec/running/finish/observation-box/${encryptSlug}`);
  }

  const toggleItem = (item: string) => {
    setSelectMaterial((prevItems) => {
      const protocolKey = String(serviceData?.protocol);

      return {
        ...prevItems,
        [protocolKey]: {
          ...(prevItems[protocolKey] || {}),
          [item]: (prevItems[protocolKey]?.[item] || 0) + 1
        }
      };
    });
  };

  const toggleItemReset = (item: string) => {
    setSelectMaterial((prevItems) => {
      const updatedItems = { ...prevItems };
      const protocolKey = String(serviceData?.protocol);
      const selectedItemsCount = Object.keys(updatedItems[protocolKey] || {}).length;

      if (updatedItems[protocolKey].hasOwnProperty(item)) {
        selectedItemsCount > 1
          ? delete updatedItems[protocolKey][item]
          : delete updatedItems[protocolKey];
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

  const filteredItems = items?.filter(
    (item) =>
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (showSelected ? selectMaterial[String(serviceData?.protocol)]?.[item.id] : true)
  );

  const selectedItemKeys = Object.keys(selectMaterial[String(serviceData?.protocol)] || {});

  const proportion = { width: 30, height: 30 };

  return (
    <ListContainer>
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
          <Image priority src={infoSvg} alt="Add" {...proportion} />
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
            <ListItem
              key={item.description}
              item={item.description}
              count={selectMaterial?.[String(serviceData?.protocol)]?.[item.id]}
              onSelect={() => toggleItem(item.id)}
              onReset={() => toggleItemReset(item.id)}
            />
          ))}
      <div>
        <Button onClick={() => router.back()}>Voltar</Button>
        <Button onClick={() => fetchConcludedMaterial()}>Avançar</Button>
      </div>
    </ListContainer>
  );
}
