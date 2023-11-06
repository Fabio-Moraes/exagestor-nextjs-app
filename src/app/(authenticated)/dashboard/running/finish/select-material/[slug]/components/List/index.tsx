'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useContexState } from '../../../../../../../../../hooks/useGlobalContext';
import ListItem from '../ListItem';
import infoSvg from './assets/svg/info.svg';
import searchSvg from './assets/svg/search.svg';
import { Button, ListContainer, SearchBar, SearchWrapper } from './styles';

import Cookie from 'js-cookie';
import api from 'lib/api';

interface ListProps {
  id: string;
  description: string;
}

interface Service {
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

export function List({
  service,
  items
}: {
  service: Service;
  items: ListProps[];
}) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showSelected, setShowSelected] = useState<boolean>(false);

  /* eslint-disable */
    const [connectionError, setConnectionError] = useState(false);
    const [isPopupValue, setIsPopupValue] = useState<string | null>(null);
    /* eslint-enable */

  const { selectMaterial, setSelectMaterial } = useContexState();

  const storedCookie = Cookie.get('auth_token');
  const maxRetries = 4;

  const router = useRouter();

  async function fetchConcludedMaterial() {
    setConnectionError(false);

    for (let count = 0; count < maxRetries; count++) {
      try {
        setIsPopupValue(
          count > 0 ? `Conectando<br>Tentativa (${count + 1})` : 'Conectando'
        );

        const response = await api.get('/api/services/concluded', {
          params: {
            token: storedCookie,
            protocol: service?.protocol,
            serviceIds: JSON.stringify('selectedItems')
          }
        });

        count = maxRetries;
        router.push('/dashboard/new');
        console.log(response.data);
      } catch (error) {
        await new Promise((resolve) => setTimeout(resolve, 5000));
        setConnectionError(true);
      }
    }
    setIsPopupValue(null);
  }

  const toggleItem = (item: string) => {
    setSelectMaterial((prevItems) => {
      const protocolKey = String(service?.protocol);

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
      const protocolKey = String(service?.protocol);
      const selectedItemsCount = Object.keys(
        updatedItems[protocolKey] || {}
      ).length;

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
      const protocolKey = String(service?.protocol);

      if (updatedItems.hasOwnProperty(protocolKey)) {
        delete updatedItems[protocolKey];
      }

      return updatedItems;
    });
  };

  const filteredItems = items?.filter(
    (item) =>
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (showSelected ? selectMaterial[String(service?.protocol)][item.id] : true)
  );

  const selectedItemKeys = Object.keys(
    selectMaterial[String(service?.protocol)] || {}
  );

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
                : `Filtrar Selecionado${
                    selectedItemKeys.length > 1 ? 's' : ''
                  } (${selectedItemKeys.length})`}
            </Button>

            <Button onClick={selectServiceClean}>Limpar</Button>
          </div>
          <Image priority src={infoSvg} alt="Add" {...proportion} />
        </div>
      </div>
      {filteredItems.map((item) => (
        <ListItem
          key={item.description}
          item={item.description}
          count={selectMaterial?.[String(service?.protocol)]?.[item.id]}
          onSelect={() => toggleItem(item.id)}
          onReset={() => toggleItemReset(item.id)}
        />
      ))}
      <div>
        <Button onClick={() => router.back()}>Voltar</Button>
        <Button onClick={() => fetchConcludedMaterial()}>Concluir</Button>
      </div>
    </ListContainer>
  );
}
